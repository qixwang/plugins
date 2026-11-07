import { execFileSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
let modes;

export function portableBytes(path) {
  const bytes = readFileSync(path);
  return bytes.includes(0) ? bytes : Buffer.from(bytes.toString("utf8").replaceAll("\r\n", "\n"));
}

export function executable(path) {
  const native = (statSync(path).mode & 0o111) !== 0;
  if (process.platform !== "win32") return native;
  if (!modes) {
    modes = new Map(execFileSync("git", ["ls-files", "--stage", "-z"], { cwd: root, encoding: "utf8" })
      .split("\0").filter(Boolean).map((line) => [line.slice(line.indexOf("\t") + 1), line.startsWith("100755 ")]));
  }
  const key = relative(root, resolve(path)).split("\\").join("/");
  return modes.get(key) ?? native;
}
