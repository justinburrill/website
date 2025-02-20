import { send } from "@oak/oak/send";
import { Application } from "jsr:@oak/oak/";

// main
if (import.meta.url === Deno.mainModule) {
  const buildPath = `${Deno.cwd()}/frontend/dist`;
  const urlPath = "index.html";

  const app = new Application();
  app.use(async (context, next) => {
    try {
      await send(context, context.request.url.pathname, {
        root: buildPath,
        index: urlPath,
      });
    } catch {
      await next();
    }
  });

  app.use(async (context) => {
    await send(context, urlPath, { root: buildPath });
  });

  await app.listen({ port: 8080 });
}
