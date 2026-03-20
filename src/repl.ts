import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((word) => word !== "");
}

export function startREPL(state: State): void {
  const stateRef = state;
  stateRef.rl.prompt();

  stateRef.rl.on("line", (input) => {
    void (async () => {
      const words = cleanInput(input);
      if (words.length === 0) {
        stateRef.rl.prompt();
        return;
      }

      const [commandName, ...args] = words;

      const cmd = stateRef.registry[commandName];
      if (typeof cmd === "undefined") {
        console.log(
          `Unknown command: "${commandName}". Type "help for a list of commands."`,
        );
        stateRef.rl.prompt();
        return;
      }

      try {
        await cmd.callback(state, ...args);
      } catch (err) {
        console.log(`error:`, { cause: err });
      }

      stateRef.rl.prompt();
    })();
  });
}
