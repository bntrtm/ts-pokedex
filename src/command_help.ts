import type { State } from "./state.js";

export function commandHelp(state: State): void {
  console.log(`\nWelcome to the Pokedex!\nUsage:\n`);
  for (const v of Object.values(state.registry)) {
    console.log(`${v.name}: ${v.description}`);
  }
  console.log(`\n`);
}
