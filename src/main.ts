import { MS_PER_S } from "./constants.js";
import { startREPL } from "./repl.js";
import { initState } from "./state.js";

function main(): void {
  const state = initState(MS_PER_S);
  startREPL(state);
}

main();
