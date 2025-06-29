import { Context } from "@oak/oak";
import { commandOutput } from "./read_data.ts";

const JFORMAT_PATH = "...";

async function jsonFormatter(json: string) {
    const result = await commandOutput(`${JFORMAT_PATH}`);
}
