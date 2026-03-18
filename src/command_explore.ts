import { State } from "./state.js"

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
  if (args?.length === 0) {
    console.log('no location provided.');
    return Promise.resolve();
  }

  const locName = args[0]

  const locA = await state.api.fetchLocation(locName);
  for (const enc of locA.pokemon_encounters) {
    const pokeName = enc.pokemon.name;
    console.log(pokeName);
  }

};

