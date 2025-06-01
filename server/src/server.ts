import { Application, Router, send } from "jsr:@oak/oak/";
import { readFileSync } from "jsr:@std/fs/unstable-read-file";
import * as path from "jsr:@std/path";
import { handleDataRequest } from "./endpoints.ts";
import { log } from "./utils.ts";

const WEBSITE_ROOT = path.resolve(path.join(
    path.dirname(path.fromFileUrl(import.meta.url)),
    "../..",
));
const SERVER_ROOT = path.join(WEBSITE_ROOT, "/server");
const FRONTEND_ROOT = path.join(WEBSITE_ROOT, "/frontend");
const CONFIG_NAME = ".SERVERINFO";
log(`Deno.cwd(): ${Deno.cwd()}`);
log(`WEBSITE_ROOT: ${WEBSITE_ROOT}`);

let PORT: number = 8080;
const buildPath: string = `${FRONTEND_ROOT}/dist`;
{ // LOAD SERVER INFO FROM FILE
    try {
        const decoder = new TextDecoder("utf-8");
        const configFilepath: string = path.join(SERVER_ROOT, CONFIG_NAME);
        const datajson = JSON.parse(
            decoder.decode(readFileSync(configFilepath)),
        );
        PORT = datajson.port || PORT;
        log(`read config file, serving on port ${PORT}`);
    } catch (e) {
        const errstr: string = e as string;
        if (
            errstr.toString().startsWith("NotFound: No such file or directory")
        ) {
            log(`No ${CONFIG_NAME} file, using default settings`);
        } else {
            log(
                `error reading ${CONFIG_NAME} file, using default settings due to: ${e}`,
            );
        }
    }
}

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
    const ip = context.request.ips || context.request.ip || "??";
    console.log(
        `new ${context.request.method} request to ${context.request.url} from ${ip}`,
    );
    return next();
});

// HANDLE DATA ENDPOINTS
app.use(async (ctx, next) => {
    if (ctx.request.method == "POST" && ctx.request.url.pathname == "/data") {
        try {
            await handleDataRequest(ctx);
            return;
        } catch (err) {
            ctx.response.status = 400;
            ctx.response.body = { message: `Error: invalid request` };
            console.error(`Errored on data request due to ${err}`);
        }
    }
    return await next();
});

// fallback to serve static file based on request url pathname
app.use(async (ctx, next) => {
    if (ctx.request.method == "GET") {
        try {
            const pathname = ctx.request.url.pathname;
            // if (!isValidPath(pathname)) throw "400"; // should do some security checks here, this function doesn't work tho
            log(`serving to specific path: ${pathname}`);
            return await send(ctx, pathname, {
                root: buildPath,
                index: indexFileName,
            });
        } catch (err) {
            const errstr: string = err as string;
            if (
                !errstr.startsWith(
                    "Failed to serve to specific pathname due to: NotFoundError: No such file or directory",
                )
            ) {
                console.error(
                    `Failed to serve to specific pathname due to: ${err}`,
                );
            }

            // fallback to the home page
            if (ctx.response.writable) {
                try {
                    ctx.response.status = parseInt(errstr);
                } catch {
                    ctx.response.status = 404;
                }
            } else {
                console.error(
                    "can't write error to response, it isn't writable",
                );
            }

            return await next();
        }
    } // posts should have been handled by now (?)
    else {
        ctx.response.status = 404;
        ctx.response.body = "Endpoint not recognized";
        return;
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
