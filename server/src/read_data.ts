import { INTERNAL_ERROR } from "./errors.ts";
import { SERVER_ROOT } from "./server.ts";

async function commandOutput(command: string): Promise<string> {
    const command_name = "bash";
    const args = ["-c", `cd ${SERVER_ROOT}/src && ` + command];
    // console.log(`command: ${command_name}, command args: ${args}`);
    const process = new Deno.Command(command_name, {
        args: args,
        stdout: "piped",
        stderr: "piped",
    });
    const output = await process.output();
    const { stdout, stderr } = output;
    if (stderr.length > 0) {
        throw new TextDecoder().decode(stderr);
    } else if (!output.success) {
        throw "Exited with non-zero status";
    } else {
        const result = new TextDecoder().decode(stdout);
        if (result.trim().length == 0) throw "Empty command result";
        return result;
    }
}

export async function getCpuTemp(): Promise<string> {
    try {
        const result = await commandOutput("python3 read_cpu_temp.py");
        // console.log(`successfully returned Cpu temp: ${result}`);
        return result;
    } catch (err) {
        console.error(
            `calling python script failed due to: ${err}`,
        );
        throw INTERNAL_ERROR;
    }
}

export async function getOsVersion(): Promise<string> {
    try {
        const version = await commandOutput(
            "fastfetch | grep Ubuntu | head -1 | awk '{ print $3 }'",
        );
        // console.log(`got version ${version}`);
        return version;
    } catch (err) {
        console.error(`couldn't get os version because ${err}`);
        throw INTERNAL_ERROR;
    }
}
