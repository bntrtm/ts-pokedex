import { createInterface } from "node:readline";
import { getCommands } from "./commander.js";

export function cleanInput(input: string): string[] {
  return input.toLowerCase().trim().split(" ").filter((word) => word !== "");
}

export function startREPL(): void {
  const registry = getCommands()

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();
  rl.on("line", (line) => {
    const words = cleanInput(line);
    if (words.length === 0) {
      return
    } else {
      const [command, ...args] = words;
      const run = registry[command];
      if (run !== undefined) {
        run.callback(registry);
      }
    }
    rl.prompt();
  })
}
