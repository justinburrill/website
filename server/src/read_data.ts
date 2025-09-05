import { NOT_IMPLEMENTED_ERROR } from "./errors.ts";
import { SERVER_ROOT } from "./paths.ts";

export async function commandOutput(
    command: string,
    shell: string = "bash",
): Promise<string> {
    const args = ["-c", `cd ${SERVER_ROOT}/src && ` + command];
    // console.log(`command: ${command_name}, command args: ${args}`);
    const process = new Deno.Command(shell, {
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
    const result = await commandOutput("python3 read_cpu_temp.py");
    // console.log(`successfully returned Cpu temp: ${result}`);
    return result;
}

export async function getOsVersion(): Promise<string> {
    const version = await commandOutput(
        "fastfetch | grep Ubuntu | head -1 | awk '{ print $3 }'",
    );
    return version;
}

export async function getUptimeString(): Promise<string> {
    const timestr = await commandOutput("uptime");
    // example output:
    // 21:16:28 up  2:14,  1 user,  load average: 0.17, 0.21, 0.15
    const words: Array<string> = timestr.split(" ").filter((s) =>
        !(/^$/.test(s))
    ); // remove empty words and extra whitespace
    const outWords: Array<string> = [];
    let copying: boolean = false;
    for (const word of words) {
        if (word === "up") {
            copying = true;
            continue;
        }
        if (word.includes("user")) {
            outWords.splice(-1); // extra value on the end
            break;
        }
        if (copying) {
            outWords.push(word);
        }
    }
    return outWords.join(" ").trim().replace(/,$/, "");
}

export async function getGitFiles(reponame: string): Promise<string> {
    let result: string = await commandOutput(
        "git ls-tree -r master --name-only",
    );
    throw NOT_IMPLEMENTED_ERROR;
}
