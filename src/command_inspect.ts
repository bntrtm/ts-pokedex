import { printPokemonStats } from "./pokeapi.js";
import { State } from "./state.js"

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
  if (args?.length === 0) {
    console.log(`Enter the name of a pokemon to inspect!`);
    return Promise.resolve();
  }

  const name = args[0];

  if (!(name in state.pokedex)) {
    console.log(`You have not caught that pokemon!`);
    return Promise.resolve();
  }

  const pokemon = await state.api.getPokemon(name);
  printPokemonStats(pokemon);
}
