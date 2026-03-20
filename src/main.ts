import { startREPL } from "./repl.js";
import { initState } from "./state.js";

function main(): void {
  const state = initState(1000);
  startREPL(state);
}

main();
