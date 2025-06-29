import * as path from "jsr:@std/path";
import { log } from "./utils.ts";
import { readFileSync } from "jsr:@std/fs/unstable-read-file";
import { SERVER_ROOT } from "./server.ts";

export const CFG_FILENAME = ".SERVERINFO";
export const CFG_PATH: string = path.join(SERVER_ROOT, CFG_FILENAME);

export function getPortFromConfig() {
    try {
        const decoder = new TextDecoder("utf-8");
        const datajson = JSON.parse(
            decoder.decode(readFileSync(CFG_PATH)),
        );
        const port = datajson.port || 8080;
        log(`read config file, serving on port ${port}`);
        return port;
    } catch (e) {
        const errstr: string = e as string;
        if (
            errstr.toString().startsWith("NotFound: No such file or directory")
        ) {
            log(`No ${CFG_FILENAME} file, using default port`);
        } else {
            log(
                `error reading ${CFG_FILENAME} file, using default settings due to: ${e}`,
            );
        }
        return 8080;
    }
}
