import { INTERNAL_ERROR } from "./errors.ts";
import { getCpuTemp, getOsVersion, getUptimeString } from "./read_data.ts";
import { Context } from "jsr:@oak/oak/";
import { return404 } from "./utils.ts";

export async function handleDataRequest(ctx: Context) {
    const body = JSON.parse(await ctx.request.body.text());
    const target: string = body.target;
    console.log(`data request to on target '${target}'`);
    const endpoints_list: Map<string, () => Promise<string>> = new Map();
    // point endpoint to function
    endpoints_list.set("CPUtemp", getCpuTemp);
    endpoints_list.set("OSversion", getOsVersion);
    endpoints_list.set("serverUptime", getUptimeString);
    endpoints_list.set("websiteUptime", getOsVersion);
    // ==================
    if (endpoints_list.has(target)) {
        const targetfunc: (() => Promise<string>) | undefined = endpoints_list
            .get(target);
        if (targetfunc === undefined) {
            throw "Internal error: Target function found, but undefined.";
        }
        try {
            ctx.response.body = {
                message: await targetfunc(),
            };
            ctx.response.status = 200;
        } catch (err) {
            console.error(
                `Unexpected failure on endpoint ${target} due to ${err}`,
            );
            ctx.response.status = 500;
            ctx.response.body = {
                message: INTERNAL_ERROR,
            };
            return;
        }
    } else {
        return return404(ctx);
    }
}
