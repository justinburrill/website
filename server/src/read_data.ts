import { INTERNAL_ERROR, NOT_IMPLEMENTED_ERROR } from "./errors.ts";
type Duration = Temporal.Duration;

async function commandOutput(command: string): Promise<string> {
    const parts = command.split(" ");
    const command_name = parts[0];
    const args = parts.splice(1);
    const process = new Deno.Command(command_name, {
        args: args,
        stdout: "piped",
        stderr: "piped",
    });
    const { stdout, stderr } = await process.output();
    if (stderr.length > 0) {
        throw new TextDecoder().decode(stderr);
    } else {
        return new TextDecoder().decode(stdout);
    }
}

export async function getCpuTemp(): Promise<string> {
    try {
        const result = await commandOutput("python3 read_cp_temp.py");
        console.log(`successfully returned Cpu temp: ${result}`);
        return result;
    } catch (err) {
        console.error(
            `calling python script failed due to: ${err}`,
        );
        throw err;
    }
}

async function getUptimeString(): Promise<string> {
    try {
        const timestr = await commandOutput("uptime");
        return timestr;
    } catch (err) {
        console.error(`couldn't get uptime because: ${err}`);
        return INTERNAL_ERROR;
    }
}

export async function getUptimeDuration(): Promise<[Duration]> {
    const result = await getUptimeString();

    throw NOT_IMPLEMENTED_ERROR;
}

export async function getGitFiles(reponame: string): Promise<[string, number]> {
    try {
        let result: string = await commandOutput(
            "git ls-tree -r master --name-only",
        );
    } catch {
    }
    throw "todo";
}
