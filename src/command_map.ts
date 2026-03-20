import type { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
  const stateRef = state;

  const locations = await stateRef.api.fetchLocations(state.nextLocationsURL);

  stateRef.nextLocationsURL = locations.next ?? "";
  stateRef.prevLocationsURL = locations.previous ?? "";

  for (const l of locations.results) {
    console.log(l.name);
  }
}

export async function commandMapb(state: State): Promise<void> {
  const stateRef = state;

  if (stateRef.prevLocationsURL === "") {
    console.log(`You're on the first page.`);
    return;
  }

  const locations = await state.api.fetchLocations(state.prevLocationsURL);

  stateRef.nextLocationsURL = locations.next ?? "";
  stateRef.prevLocationsURL = locations.previous ?? "";

  for (const l of locations.results) {
    console.log(l.name);
  }
}
