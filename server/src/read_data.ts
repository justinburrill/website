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

export async function getOsVersion(): Promise<string> {
    try {
        const version = await commandOutput(
            "fastfetch | grep Ubuntu | awk '{ print $3 }'",
        );
        console.log(`got version ${version}`);
        return version;
    } catch (err) {
        console.error(`couldn't get os version because ${err}`);
        throw err;
    }
}
