import { join } from "jsr:@std/path/join";
import { buildPath } from "./server.ts";

export function isValidPath(path: string): boolean {
    const fullPath = join(buildPath, path);
    return fullPath.startsWith(buildPath); // make sure the path doesn't escape
}
