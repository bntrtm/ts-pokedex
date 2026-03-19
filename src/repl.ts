import { initState } from "./state.js";

export function cleanInput(input: string): string[] {
  return input.toLowerCase().trim().split(" ").filter((word) => word !== "");
}

export async function startREPL(): Promise<void> {
  let state = initState();

  state.rl.prompt();
  state.rl.on("line", async (line) => {
    const words = cleanInput(line);
    if (words.length === 0) {
      return
    } else {
      const [commandName, ...args] = words;
      const cmd = state.registry[commandName];
      if (!cmd) {
        console.log(
          `Unknown command: "${commandName}". Type "help for a list of commands."`
        );
        state.rl.prompt();
        return;
      }
      if (cmd !== undefined) {
        try {
          await cmd.callback(state, ...args);
        } catch (err) {
          console.log(`error: ${(err as Error).message}`);
        }
      }
    }
    state.rl.prompt();
  })
}
