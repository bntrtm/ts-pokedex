import { State } from "./state.js"

export function commandHelp(state: State): void {
  console.log(`Welcome to the Pokedex!\nUsage:\n`);
  for (const [_, v] of Object.entries(state.registry)) {
    console.log(`${v.name}: ${v.description}`);
  }
};
