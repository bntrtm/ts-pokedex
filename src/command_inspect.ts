import { printPokemonStats } from "./pokeapi.js";
import { EMPTY_ARR } from "./constants.js";
import type { State } from "./state.js";

export async function commandInspect(
  state: State,
  ...args: string[]
): Promise<void> {
  if (args.length === EMPTY_ARR) {
    console.log(`Enter the name of a pokemon to inspect!`);
  }

  const [name] = args;

  if (!(name in state.pokedex)) {
    console.log(`You have not caught that pokemon!`);
  }

  const pokemon = await state.api.getPokemon(name);
  printPokemonStats(pokemon);
}
