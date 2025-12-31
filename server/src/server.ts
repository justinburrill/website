import { Application, Router, send } from "jsr:@oak/oak/";
import { getPortFromConfig } from "./config.ts";
import { handleDataRequest } from "./endpoints.ts";
import { isValidPath } from "./path_utils.ts";
import {
    FRONTEND_ROOT,
    WEBSITE_ROOT,
} from "./paths.ts";
import {
    checkSuspiciousIp,
    logSuspiciousRequest,
    requestIsSuspicious,
} from "./security.ts";
import { log } from "./utils.ts";
import { mockContextState } from "@oak/oak/testing";

log(`Deno.cwd(): ${Deno.cwd()}`);
log(`WEBSITE_ROOT: ${WEBSITE_ROOT}`);

const PORT: number = await getPortFromConfig();
export const buildPath: string = `${FRONTEND_ROOT}/dist`;

log(`Website dist path: ${buildPath}`);

// ============= SET UP SERVER
const router = new Router();
const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods()); // do i need this?
const indexFileName = "index.html";
// =========================

// SECURITY !!!
app.use(async (ctx, next) => {
    if (requestIsSuspicious(ctx)) {
        logSuspiciousRequest(ctx);
    }
    if (await checkSuspiciousIp(ctx)) {
        log(`Got suspicious request from IP ${ctx.request.ip}. Denying.`);
        ctx.response.status = 403;
        return;
    }
    await next();
});

// LOGGING
app.use((context, next) => {
    let ip = "??";
    try {
        if (context.request.ips.length > 0) {
            ip = context.request.ips.toString()
        }
        else if (context.request.ip) { ip = context.request.ip }
    }
    catch (_) {
        ;
    }
    console.log(
        `new ${context.request.method} request to ${context.request.url} from ${ip}`,
    );
    return next();
});

app.use((ctx, next) => {
    ctx.response.headers.set("X-Clacks-Overhead", "GNU Terry Pratchet");
    return next();
});

// HANDLE DATA ENDPOINTS
app.use(async (ctx, next) => {
    if (ctx.request.method == "POST" && ctx.request.url.pathname == "/data") {
        try {
            return await handleDataRequest(ctx);
        } catch (err) {
            ctx.response.status = 500;
            ctx.response.body = { message: err };
            console.error(`Errored on data POST request due to ${err}`);
            return;
        }
    }

    return await next();
});

// fallback to serve static file based on request url pathname
app.use(async (ctx, next) => {
    try {
        if (ctx.request.method !== "GET") {
            throw `only GET requests expected here, got a ${ctx.request.method}`;
        }
        const pathname = ctx.request.url.pathname;
        if (!isValidPath(pathname)) throw `path ${pathname} isn't allowed`;
        log(`attempting to serve to specific path: ${pathname}`);
        return await send(ctx, pathname, {
            root: buildPath,
            index: indexFileName,
        });
    } catch (err) {
        const errstr: string = err as string;
        const isNotFoundError = errstr.toString().trim().startsWith(
            "NotFoundError: No such file or directory",
        );
        if (!isNotFoundError) {
            console.error(
                `Failed to serve to specific pathname due to: ${err}. Falling back to homepage.`,
            );
        } else {
            log("Can't find file matching this path, falling back to homepage.");
        }
        return await next();
    }
});

// serve index page
app.use(async (context) => {
    log("serving index page");
    return await send(context, indexFileName, { root: buildPath });
});

log(`Listening on port ${PORT}`);
await app.listen({ port: PORT });
