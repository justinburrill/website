import { log, readJsonFile } from "./utils.ts";
import { CFG_FILENAME, CFG_PATH } from "./paths.ts";

export async function getPortFromConfig() {
    try {
        const json = await readJsonFile(CFG_PATH);
        const port = Number(json.port) || 8080;
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
