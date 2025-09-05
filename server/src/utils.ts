import { Context } from "jsr:@oak/oak/";

export async function readJsonFile(filepath: string): Promise<any> {
    const file_contents = await Deno.readTextFile(filepath);
    const datajson = JSON.parse(file_contents);
    return datajson;
}

export async function writeJsonFile(filepath: string, data: any): Promise<void> {
    const data_str: string = JSON.stringify(data);
    Deno.writeTextFile(filepath, data_str);
}

export function log(msg: string) {
    console.log(`-- ${msg} --`);
}

export function containsAny(str: string, strs: [string]): boolean {
    for (const test_str of strs) {
        if (str.includes(test_str)) {
            return true;
        }
    }
    return false;
}

export function removeSuffix(str: string, suffix: string): string {
    if (str.endsWith(suffix)) {
        return str.slice(0, str.length - suffix.length);
    } else {
        return str;
    }
}

export function removePrefix(str: string, prefix: string): string {
    if (str.startsWith(prefix)) {
        return str.slice(prefix.length, str.length);
    } else {
        return str;
    }
}

export function return404(ctx: Context): void {
    const ret_message = `Error: unknown target`;
    log(`Returning 404 for request to ${ctx.request.url}`);
    console.log(ret_message);
    ctx.response.status = 404;
    ctx.response.body = {
        message: ret_message,
    };
}

export function returnNotImplemented(ctx: Context): void {
    const ret_message =
        `Error: Sorry, haven't finished implementing this yet...`;
    log("WARNING: Returning Not Yet Implemented...");
    console.log(ret_message);
    ctx.response.status = 404;
    ctx.response.body = {
        message: ret_message,
    };
}
