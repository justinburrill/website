import { Application, Router, send } from "jsr:@oak/oak/";
import * as path from "jsr:@std/path";
import { handleDataRequest, handleProjectRequest } from "./endpoints.ts";
import { log } from "./utils.ts";
import { isValidPath } from "./paths.ts";
import { getPortFromConfig } from "./config.ts";

export const WEBSITE_ROOT = path.resolve(path.join(
    path.dirname(path.fromFileUrl(import.meta.url)),
    "../..",
));
export const SERVER_ROOT = path.join(WEBSITE_ROOT, "/server");
export const FRONTEND_ROOT = path.join(WEBSITE_ROOT, "/frontend");
export const CFG_FILENAME = ".SERVERINFO";
export const CFG_PATH: string = path.join(SERVER_ROOT, CFG_FILENAME);
log(`Deno.cwd(): ${Deno.cwd()}`);
log(`WEBSITE_ROOT: ${WEBSITE_ROOT}`);

const PORT: number = getPortFromConfig();
export const buildPath: string = `${FRONTEND_ROOT}/dist`;

log(`Website dist path: ${buildPath}`);

// ========================= SET UP SERVER
const router = new Router();
const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods()); // do i need this?
const indexFileName = "index.html";
// =========================

// LOGGING
app.use((context, next) => {
    let ip = context.request.ips.toString();
    if (!ip) ip = context.request.ip;
    if (!ip) ip = "??";
    console.log(
        `new ${context.request.method} request to ${context.request.url} from ${ip}`,
    );
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
    if (
        ctx.request.method == "POST" &&
        ctx.request.url.pathname.startsWith("/project")
    ) {
        try {
            return await handleProjectRequest(ctx);
        } catch (err) {
            ctx.response.status = 500;
            ctx.response.body = { message: err };
            console.error(`Errored on project POST request due to ${err}`);
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
        if (!isValidPath(pathname)) throw "400";
        log(`attempting to serve to specific path: ${pathname}`);
        return await send(ctx, pathname, {
            root: buildPath,
            index: indexFileName,
        });
    } catch (err) {
        const errstr: string = err as string;
        if (
            !errstr.toString().trim().startsWith(
                "NotFoundError: No such file or directory",
            )
        ) {
            console.error(
                `Failed to serve to specific pathname due to: ${err}`,
            );
        }
        // return return404(ctx);
        log("Can't find file matching this path, falling back to homepage");
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

// // MAIN
// if (import.meta.url === Deno.mainModule) {
// }
