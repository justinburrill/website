import requests
import time
import datetime
import zoneinfo

LOG_FILE_PATH = "~/logs/website_status.log"

def log_ping_to_file(website_is_up: bool):
    with open(LOG_FILE_PATH, "a") as f:
        the_time = datetime.datetime.now(tz=zoneinfo.ZoneInfo("America/Toronto")).strftime(format="%c")
        f.write(f"{the_time}={'SUCCESS' if website_is_up else 'FAILURE'}\n")


def ping_website() -> bool:
    result: requests.Response = requests.get("http://justinburrill.ca")
    success: bool = (result.status_code == 200)
    return success


def main():
    delay_between_pings = 60
    while True:
        time.sleep(delay_between_pings)
        result: bool = ping_website()
        log_ping_to_file(result)


if __name__ == "__main__":
    main()
