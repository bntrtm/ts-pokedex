import { MILLIS_PER_SEC, SEC_PER_MIN } from "./constants.js";
import { startREPL } from "./repl.js";
import { initState } from "./state.js";

const REAP_LOOP_INTERVAL_MINUTES = 5;

function main(): void {
  const state = initState(
    MILLIS_PER_SEC * SEC_PER_MIN * REAP_LOOP_INTERVAL_MINUTES,
  );
  startREPL(state);
}

main();
