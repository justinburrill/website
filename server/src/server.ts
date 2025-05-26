import { Application, Router, send } from "jsr:@oak/oak/";
import { readFileSync } from "jsr:@std/fs/unstable-read-file";
import * as path from "jsr:@std/path";
import { handlePostRequest } from "./posts.ts";
import { log } from "./utils.ts";

const WEBSITE_ROOT = path.resolve(path.join(
    path.dirname(path.fromFileUrl(import.meta.url)),
    "../..",
));
const SERVER_ROOT = path.join(WEBSITE_ROOT, "/server");
const FRONTEND_ROOT = path.join(WEBSITE_ROOT, "/frontend");
log(`Deno.cwd(): ${Deno.cwd()}`);
log(`WEBSITE_ROOT: ${WEBSITE_ROOT}`);

let PORT: number = 8080;
const buildPath: string = `${FRONTEND_ROOT}/dist`;
{ // LOAD SERVER INFO FROM FILE
    try {
        const decoder = new TextDecoder("utf-8");
        const configFilepath: string = path.join(SERVER_ROOT, ".SERVERINFO");
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
            log("No .SERVERINFO file, using default settings");
        } else {
            log(
                `error reading port specification file, using default settings due to: ${e}`,
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

app.use(async (context, next) => {
    console.log(
        `new ${context.request.method} request to ${context.request.url}`,
    );
    await next();
});

// HANDLE POST REQS
app.use(async (ctx, next) => {
    if (ctx.request.method == "POST") {
        try {
            await handlePostRequest(ctx);
        } catch (err) {
            ctx.response.status = 400;
            ctx.response.body = { message: `Error: invalid request` };
            console.log(`Errored on POST request due to ${err}`);
        }
    }
    next();
});

// router.post("/data", async (ctx) => {
// });

// serve static file based on request url pathname
app.use(async (context, next) => {
    if (context.request.method == "GET") {
        try {
            const pathname = context.request.url.pathname;
            // if (!isValidPath(pathname)) throw "400"; // should do some security checks here, this function doesn't work tho
            log(`serving to specific path: ${pathname}`);
            send(context, pathname, {
                root: buildPath,
                index: indexFileName,
            });
        } catch (err) {
            // fallback to the home page
            try {
                context.response.status = parseInt(err as string);
            } catch {
                context.response.status = 404;
            }

            console.error(
                `Failed to serve to specific pathname due to:\n${err}`,
            );
            await next();
        }
    }
});

// serve index page
app.use(async (context) => {
    log("serving index page");
    await send(context, indexFileName, { root: buildPath });
});

log(`Listening on port ${PORT}`);
await app.listen({ port: PORT });

// // MAIN
// if (import.meta.url === Deno.mainModule) {
// }
