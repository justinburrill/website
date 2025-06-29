import { Context } from "jsr:@oak/oak/";

export function log(msg: string) {
    console.log(`-- ${msg} --`);
}

export function removeSuffix(str: string, suffix: string) {
    if (str.endsWith(suffix)) {
        return str.slice(0, str.length - suffix.length);
    } else {
        return str;
    }
}

export function removePrefix(str: string, suffix: string) {
    if (str.startsWith(suffix)) {
        return str.slice(suffix.length, str.length);
    } else {
        return str;
    }
}

export async function return404(ctx: Context) {
    const body = JSON.parse(await ctx.request.body.text());
    const ret_message = `Error: didn't recognize target "${body.target}"`;
    log("Returning 404...");
    console.log(ret_message);
    ctx.response.status = 404;
    ctx.response.body = {
        message: ret_message,
    };
}

export function returnNotImplemented(ctx: Context) {
    const ret_message =
        `Error: Sorry, haven't finished implementing this yet...`;
    log("WARNING: Returning Not Yet Implemented...");
    console.log(ret_message);
    ctx.response.status = 404;
    ctx.response.body = {
        message: ret_message,
    };
}
