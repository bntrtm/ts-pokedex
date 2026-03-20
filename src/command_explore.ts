import type { State } from "./state.js";

export async function commandExplore(
  state: State,
  ...args: string[]
): Promise<void> {
  if (args.length === 0) {
    console.log("no location provided.");
  }

  const [locName] = args;

  const locA = await state.api.fetchLocation(locName);
  for (const enc of locA.pokemon_encounters) {
    const name = enc.pokemon.name;
    console.log(name);
  }
}
