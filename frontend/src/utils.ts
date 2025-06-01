export async function fetchData(target: string): Promise<string> {
    let fetchUrl: string = `${window.location.origin}/data`;
    let reqObj = {
        method: "POST",
        body: JSON.stringify({
            target: target,
        }),
    };
    let data = await fetch(fetchUrl, reqObj).then((response) => response.json())
        .catch((err) => {
            console.error(`failed to fetch because ${err}`);
        });
    return data.message;
}
