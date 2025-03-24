const mimeTypes = new Map<string, string>();
mimeTypes.set(".js", "application/javascript");
mimeTypes.set(".css", "text/css");
mimeTypes.set(".html", "text/html");
mimeTypes.set(".json", "application/json");
mimeTypes.set(".png", "image/png");
mimeTypes.set(".jpg", "image/jpeg");
mimeTypes.set(".gif", "image/gif");
mimeTypes.set(".svg", "image/svg+xml");
mimeTypes.set(".ico", "image/x-icon");

// chatgpt function
export function getMimeType(path: string): string {
    const ext = path.slice(((path.lastIndexOf(".") - 1) >>> 0) + 2);
    return mimeTypes.get(ext) || "application/octet-stream"; // Default to binary
}
