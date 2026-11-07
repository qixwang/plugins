import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const [flag, directory, command, ...args] = process.argv.slice(2);
if (flag !== "--data-dir" || !directory || !["add", "list", "complete"].includes(command)) {
  console.error('Usage: node app.mjs --data-dir DIRECTORY add TITLE | list | complete ID');
  process.exit(2);
}
const file = join(resolve(directory), "tasks.json");
const tasks = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : [];
if (!Array.isArray(tasks) || tasks.some((task) =>
  !Number.isInteger(task.id) || typeof task.title !== "string" || typeof task.done !== "boolean")) {
  throw new Error("Invalid task store");
}
if (command === "add") {
  const title = args.join(" ").trim();
  if (!title) throw new Error("A task title is required");
  const task = { id: tasks.reduce((id, task) => Math.max(id, task.id), 0) + 1, title, done: false };
  tasks.push(task);
  mkdirSync(resolve(directory), { recursive: true });
  writeFileSync(file, `${JSON.stringify(tasks, null, 2)}\n`);
  console.log(JSON.stringify(task));
} else if (command === "complete") {
  const id = Number(args[0]);
  const task = tasks.find((task) => task.id === id);
  if (!task) throw new Error(`Task not found: ${args[0]}`);
  task.done = true;
  writeFileSync(file, `${JSON.stringify(tasks, null, 2)}\n`);
  console.log(JSON.stringify(task));
} else {
  console.log(JSON.stringify(tasks));
}
