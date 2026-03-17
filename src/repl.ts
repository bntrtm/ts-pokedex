import { initState } from "./state.js";

export function cleanInput(input: string): string[] {
  return input.toLowerCase().trim().split(" ").filter((word) => word !== "");
}

export function startREPL(): void {

  let state = initState()

  state.rl.prompt();
  state.rl.on("line", (line) => {
    const words = cleanInput(line);
    if (words.length === 0) {
      return
    } else {
      const [command, ...args] = words;
      const run = state.registry[command];
      if (run !== undefined) {
        run.callback(state);
      }
    }
    state.rl.prompt();
  })
}
