import subprocess, sys


def main():
    result = subprocess.run(["sensors"], capture_output=True)
    err = result.stderr.decode()
    if err != "":
        print(f"Error: {err}", file=sys.stderr)

    cpu_line = ""
    for line in result.stdout.decode():
        if line.startswith("CPU:"):
            cpu_line = line
            break

    cpu_line = cpu_line.removeprefix("CPU:").strip()
    print(cpu_line)


if __name__ == "__main__":
    main()

    # cpu_line = ""
    # with open("sensors.txt", "r") as f:
    #     lines = f.readlines()
    #     for line in lines:
    #         if line.startswith("CPU:"):
    #             cpu_line = line
    #             break
