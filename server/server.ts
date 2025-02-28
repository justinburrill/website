import { Application, Router, send } from "jsr:@oak/oak/";
import { readFileSync } from "jsr:@std/fs/unstable-read-file";
import { getCpuTemp } from "./read_data.ts";

let PORT: number = 80; // used to be 8080
{ // LOAD SERVER INFO FROM FILE
  try {
    const decoder = new TextDecoder("utf-8");
    const filename: string = "SERVERINFO";
    const data = readFileSync(filename);
    const datajson = JSON.parse(decoder.decode(data));
    PORT = datajson.port;
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
app.use(router.allowedMethods());
const buildPath = `${Deno.cwd()}/../frontend/dist`;
const indexPath = "index.html";
// =========================

router.post("/data", async (ctx) => {
  const body = JSON.parse(await ctx.request.body.text());
  try {
    switch (body.target) {
      case "CPUtemp":
        ctx.response.status = 200;
        ctx.response.body = {
          message: await getCpuTemp(),
        };
        break;

      default:
        ctx.response.status = 404;
        ctx.response.body = {
          message: `Error: didn't recognize target "${body.target}"`,
        };
        return;
    }
  } catch (err) {
    ctx.response.status = 400;
    ctx.response.body = { message: `Error: invalid request` };
    console.log(`Errored on POST request due to ${err} with body: ${body}`);
  }
});

app.use(async (context, next) => {
  try {
    await send(context, context.request.url.pathname, {
      root: buildPath,
      index: indexPath,
    });
  } catch {
    await next();
  }
});
app.use(async (context) => {
  await send(context, indexPath, { root: buildPath });
});

console.log(`Listening on port ${PORT}`);
await app.listen({ port: PORT });

// // MAIN
// if (import.meta.url === Deno.mainModule) {
// }
