import { EMPTY_ARR } from "./constants.js";
import type { State } from "./state.js";

export function commandPokedex(state: State): void {
  if (Object.keys(state.pokedex).length === EMPTY_ARR) {
    console.log(`You have no pokemon in your pokedex!`);
  }

  console.log(`Your Pokedex:`);
  for (const pokemon of Object.values(state.pokedex)) {
    console.log(`  - ${pokemon.name}`);
  }
}
