import { getCpuTemp, getOsVersion } from "./read_data.ts";
import { Context } from "jsr:@oak/oak/";

export async function handleDataRequest(ctx: Context) {
    const body = JSON.parse(await ctx.request.body.text());
    const target: string = body.target;
    console.log(`data request to on target '${target}'`);
    switch (target) {
        case "CPUtemp":
            ctx.response.status = 200;
            ctx.response.body = {
                message: await getCpuTemp(),
            };
            break;

        case "OSversion":
            ctx.response.status = 200;
            ctx.response.body = {
                message: await getOsVersion(),
            };
            break;
        default:
            {
                const ret_message =
                    `Error: didn't recognize target "${body.target}"`;
                console.log(ret_message);
                ctx.response.status = 404;
                ctx.response.body = {
                    message: ret_message,
                };
            }
            return;
    }
}
