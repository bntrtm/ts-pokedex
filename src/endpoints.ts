import { interpStringVerbs } from "./formatting_verbs.js";

/*
  These types provide a hierarchical structure for building
  consistent strings which correspond to endpoint URLs
  defined by the PokeAPI.

  The baseURL ought to be provided by the caller; it is never
  assumed.
*/

export const pathParam = `/%s`;

const URLLocationAreas = "/location-area";
const URLLocationArea = URLLocationAreas + pathParam;

export const URLPokemons = "/pokemon";
const URLPokemon = URLPokemons + pathParam;

export function EndpointLocationAreas(): string {
  return URLLocationAreas;
}

export function EndpointLocationArea(name: string): string {
  return interpStringVerbs(URLLocationArea, name);
}

export function EndpointPokemon(name: string): string {
  return interpStringVerbs(URLPokemon, name);
}
