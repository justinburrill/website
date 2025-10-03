import { Context } from "jsr:@oak/oak/";
import * as path from "jsr:@std/path";
import { removePrefix, log, readJsonFile, writeJsonFile } from "./utils.ts";
import { SERVER_ROOT } from "./paths.ts";

const SUSPICIOUS_IPS_FILEPATH = path.join(
    SERVER_ROOT,
    "data/suspicious_ips.json",
);
const SUSPICIOUS_THRESHOLD = 2;
const SUSPICIOUS_ENDPOINTS = [
    ".env",
    "boaform/admin/formLogin",
    ".vscode/sftp.json",
    "server",
    ".git",
    ".DS_Store",
    "telescope/requests",
    "actuator",
];
const SUSPICIOUS_KEYWORDS = [
    "eval",
    "php",
];

export function requestIsSuspicious(ctx: Context) {
    const url = removePrefix(ctx.request.url.pathname, "/");
    // if the endpoint starts with one of those marked as suspicious...
    if (
        SUSPICIOUS_ENDPOINTS.map((s: string) => url.startsWith(s)).some((e) =>
            e === true
        )
        || SUSPICIOUS_KEYWORDS.map((s: string) => url.includes(s)).some((e) =>
            e === true
                                                                       )
    ) {
        return true;
    }
    return false;
}

export async function logSuspiciousRequest(ctx: Context) {
    log(`Denying suspicious request from ${ctx.request.ip}`);
    let data = await readJsonFile(SUSPICIOUS_IPS_FILEPATH);
    if (!data) { log("Error reading suspicious ips file, returned undefined/null"); return; }
    const ip = ctx.request.ip;
    if (!data.suspicious_ips) {
        data.suspicious_ips = {};
    }
    if (ip in data.suspicious_ips) {
        data.suspicious_ips[ip] += 1;
    } else {
        data.suspicious_ips[ip] = 1;
    }
    writeJsonFile(SUSPICIOUS_IPS_FILEPATH, data);
}

export async function checkSuspiciousIp(ctx: Context): Promise<boolean> {
    // check if the ip has been logged as suspicious
    try {
        const data = (await readJsonFile(SUSPICIOUS_IPS_FILEPATH)).suspicious_ips;
        if (!data) {
            log("Failed to read suspicious ip data");
            return false;
        }
        const ip = ctx.request.ip;
        if (ip in data && data[ip] > SUSPICIOUS_THRESHOLD) {
            return true;
        }
        return false;
    } catch (e) {
        log(`Failed to check if an IP is suspicious due to: ${e}`);
        return false;
    }
}
