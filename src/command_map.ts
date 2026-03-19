import { State } from "./state.js"

export async function commandMap(state: State): Promise<void> {
  const locations = await state.api.fetchLocations(state.nextLocationsURL);

  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;

  for (const l of locations.results) {
    console.log(l.name);
  }
};

export async function commandMapb(state: State): Promise<void> {
  if (!state.prevLocationsURL) {
    throw new Error(`You're on the first page.`)
  }

  const locations = await state.api.fetchLocations(state.prevLocationsURL);

  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;

  for (const l of locations.results) {
    console.log(l.name);
  }
};
