export async function getCpuTemp(): Promise<[string, number]> {
  const process = new Deno.Command("python3", {
    args: ["read_cpu_temp.py"],
    stdout: "piped",
    stderr: "piped",
  });
  const { stdout, stderr } = await process.output();
  if (stderr.length > 0) {
    console.error(
      "calling python script failed due to:",
      new TextDecoder().decode(stderr),
    );
    return ["ERROR: internal fuck-up", 500];
  }

  const result = new TextDecoder().decode(stdout);
  console.log(`successfully returned Cpu temp: ${result}`);
  return [result, 200];
}
