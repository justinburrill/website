import subprocess, sys

def main():
    result = subprocess.run(["sensors"], capture_output=True)
    err = result.stderr.decode()
    if err != "":
        print(f"Error: {err}", file=sys.stderr)
        exit(1)
    output = result.stdout.decode()

    cpu_line = ""
    for line in output.splitlines():
        if line.strip().startswith("CPU:"):
            cpu_line = line
            break

    if cpu_line.strip() == "":
        raise Exception("couldn't find cpu temp")

    cpu_line = cpu_line.strip().removeprefix("CPU:").strip()
    print(cpu_line)


if __name__ == "__main__":
    main()