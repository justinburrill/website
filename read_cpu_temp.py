import subprocess


def main():
    # x = subprocess.run(["sensors"])
    cpu_line = ""
    with open("sensors.txt", "r") as f:
        lines = f.readlines()
        for line in lines:
            if line.startswith("CPU:"):
                cpu_line = line
                break

    cpu_line = cpu_line.removeprefix("CPU:").strip()
    print(cpu_line)


if __name__ == "__main__":
    main()
