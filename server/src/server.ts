import { Application, Router, send } from "jsr:@oak/oak/";
import { readFileSync } from "jsr:@std/fs/unstable-read-file";
import { handlePostRequest } from "./posts.ts";

let PORT: number = 80; // used to be 8080
{ // LOAD SERVER INFO FROM FILE
    try {
        const decoder = new TextDecoder("utf-8");
        const filename: string = ".SERVERINFO";
        const data = readFileSync(filename);
        const datajson = JSON.parse(decoder.decode(data));
        PORT = datajson.port;
        console.log(`-- read config file, serving on port ${PORT} --\n`);
        // PORT = Number(decoder.decode(data));
    } catch (e) {
        console.log(
            ` -- error reading port specification file, using default settings due to: --\n${e}`,
        );
    }
}

// =========================
const router = new Router();
const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods()); // do i need this?
export const buildPath = `${Deno.cwd()}/../frontend/dist`;
const indexPath = "index.html";
// =========================

app.use(async (context, next) => {
    console.log(
        `new ${context.request.method} request to ${context.request.url}`,
    );
    await next();
});

router.post("/data", async (ctx) => {
    try {
        await handlePostRequest(ctx);
    } catch (err) {
        ctx.response.status = 400;
        ctx.response.body = { message: `Error: invalid request` };
        console.log(`Errored on POST request due to ${err}`);
    }
});

// serve static file based on request url pathname
app.use(async (context, next) => {
    // console.dir(context.request);
    try {
        const pathname = context.request.url.pathname;
        // if (!isValidPath(pathname)) throw "400"; // should do some security checks here, this function doesn't work tho
        console.log(`serving to specific path: ${pathname}`);
        await send(context, pathname, {
            root: buildPath,
            index: indexPath,
        });
    } catch (err) {
        // fallback to the home page
        try {
            context.response.status = parseInt(err as string);
        } catch {
            context.response.status = 404;
        }

        console.log(`Failed to serve to specific pathname due to:\n${err}`);
        await next();
    }
});

// serve index page
app.use(async (context) => {
    console.log("serving index page");
    await send(context, indexPath, { root: buildPath });
});

console.log(`Listening on port ${PORT}`);
await app.listen({ port: PORT });

// // MAIN
// if (import.meta.url === Deno.mainModule) {
// }
