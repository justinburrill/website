import { cloneState } from "https://jsr.io/@oak/oak/17.1.4/utils/clone_state.ts";
import { getCpuTemp } from "./read_data.ts";
import { Context } from "jsr:@oak/oak/";

export async function handlePostRequest(ctx: Context) {
    const body = JSON.parse(await ctx.request.body.text());
    const target: string = body.target;
    console.log(`post request to ${target}`);
    switch (target) {
        case "CPUtemp":
            ctx.response.status = 200;
            ctx.response.body = {
                message: await getCpuTemp(),
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
