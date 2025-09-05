import * as path from "jsr:@std/path";

export const WEBSITE_ROOT: string = path.resolve(path.join(
    path.dirname(path.fromFileUrl(import.meta.url)),
    "../..",
));
export const SERVER_ROOT: string = path.join(WEBSITE_ROOT, "/server");
export const FRONTEND_ROOT: string = path.join(WEBSITE_ROOT, "/frontend");
export const CFG_FILENAME: string = ".SERVERINFO";
export const CFG_PATH: string = path.join(SERVER_ROOT, CFG_FILENAME);
