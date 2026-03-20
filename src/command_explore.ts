import type { State } from "./state.js";
import { EMPTY_ARR } from "./constants.js";

export async function commandExplore(
  state: State,
  ...args: string[]
): Promise<void> {
  if (args.length === EMPTY_ARR) {
    console.log("no location provided.");
  }

  const [locName] = args;

  const locA = await state.api.fetchLocation(locName);
  for (const enc of locA.pokemon_encounters) {
    const name = enc.pokemon.name;
    console.log(name);
  }
}
