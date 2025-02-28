import { Application, send } from "jsr:@oak/oak/";
import { readFileSync } from "jsr:@std/fs/unstable-read-file";

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

// MAIN
if (import.meta.url === Deno.mainModule) {
  const buildPath = `${Deno.cwd()}/frontend/dist`;
  const urlPath = "index.html";

  const app = new Application();
  app.use(async (context, next) => {
    console.log(context, next);
    try {
      await send(context, context.request.url.pathname, {
        root: buildPath,
        index: urlPath,
      });
    } catch {
      await next(); // unused?
    }
  });

  app.use(async (context) => {
    await send(context, urlPath, { root: buildPath });
  });

  console.log(`Listening on port ${PORT}`);
  await app.listen({ port: PORT });
}
