import { State } from "./state.js"

export async function commandPokedex(state: State): Promise<void> {
  if (Object.keys(state.pokedex).length === 0) {
    console.log(`You have no pokemon in your pokedex!`);
    return Promise.resolve();
  }

  console.log(`Your Pokedex:`);
  for (const [name, _] of Object.entries(state.pokedex)) {
    console.log(`  - ${name}`);
  }
}
