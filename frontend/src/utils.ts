export async function fetchData(target: string): Promise<string> {
    let fetchUrl: string = `${window.location.origin}/data`;
    try {
        let reqObj = {
            method: "POST",
            body: JSON.stringify({
                target: target,
            }),
        };
        let status: number = 500;
        let data = await fetch(fetchUrl, reqObj).then((response) => {
            status = response.status;
            return response.json();
        })
            .catch((err) => {
                console.error(`failed to fetch because ${err}`);
                throw err;
            });
        return status == 200 ? data.message : "ERROR";
    } catch (err) {
        console.log(`Failed to fetch data because: ${err}`);
        return "ERROR";
    }
}
