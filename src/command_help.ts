import { State } from "./state.js"

export async function commandHelp(state: State): Promise<void> {
  console.log(`Welcome to the Pokedex!\nUsage:\n`);
  for (const [_, v] of Object.entries(state.registry)) {
    console.log(`${v.name}: ${v.description}`);
  }
  console.log(`\n`);
};
