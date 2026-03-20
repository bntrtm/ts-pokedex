import {
  EndpointLocationArea,
  EndpointLocationAreas,
  EndpointPokemon,
} from "./endpoints.js";
import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  readonly #cache: Cache;

  constructor(cacheInterval: number) {
    this.#cache = new Cache(cacheInterval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url =
      pageURL !== undefined && pageURL !== ""
        ? pageURL
        : PokeAPI.baseURL + EndpointLocationAreas();

    const entry = this.#cache.get(url);
    if (entry !== undefined) {
      return entry as ShallowLocations;
    }

    try {
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }

      const locations = (await resp.json()) as ShallowLocations;
      return locations;
    } catch (err) {
      throw new Error(`Failed to fetch locations: `, {
        cause: err,
      });
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = PokeAPI.baseURL + EndpointLocationArea(locationName);

    const entry = this.#cache.get(url);
    if (entry !== undefined) {
      return entry as Location;
    }

    try {
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }

      const location = (await resp.json()) as Location;
      return location;
    } catch (err) {
      throw new Error(`Error fetching location:`, { cause: err });
    }
  }

  async getPokemon(name: string): Promise<Pokemon> {
    const url = PokeAPI.baseURL + EndpointPokemon(name);

    const entry = this.#cache.get(url);
    if (entry !== undefined) {
      return entry as Pokemon;
    }

    try {
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }

      const pokemon = (await resp.json()) as Pokemon;
      return pokemon;
    } catch (err) {
      throw new Error(`error fetching pokemon:`, { cause: err });
    }
  }
}

export interface ShallowLocations {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

interface resourceData {
  name: string;
  url: string;
}

export interface Location {
  encounter_method_rates: Array<{
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: Array<{
      rate: number;
      version: resourceData;
    }>;
  }>;
  game_index: number;
  id: number;
  location: resourceData;
  name: string;
  names: Array<{
    language: resourceData;
    name: string;
  }>;
  pokemon_encounters: Array<{
    pokemon: resourceData;
    version_details: {
      encounter_details: Array<{
        chance: number;
        condition_values: unknown[];
        max_level: number;
        method: resourceData;
        min_level: number;
      }>;
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    };
  }>;
}

export function printPokemonStats(p: Pokemon): void {
  console.log(`Height: ${p.height}`);
  console.log(`Weight: ${p.weight}`);
  console.log(`Stats:`);
  for (const stat of p.stats.values()) {
    console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
  }
  console.log(`Types:`);
  for (const type of p.types.values()) {
    console.log(`  -${type.type.name}`);
  }
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Array<{
    is_hidden: boolean;
    slot: number;
    ability: {
      name: string;
      url: string;
    };
  }>;
  forms: Array<{
    name: string;
    url: string;
  }>;
  game_indices: Array<{
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }>;
  held_items: Array<{
    item: {
      name: string;
      url: string;
    };
    version_details: Array<{
      rarity: number;
      version: {
        name: string;
        url: string;
      };
    }>;
  }>;
  location_area_encounters: string;
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
    version_group_details: Array<{
      level_learned_at: number;
      version_group: {
        name: string;
        url: string;
      };
      move_learn_method: {
        name: string;
        url: string;
      };
      order: number;
    }>;
  }>;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: unknown;
    back_shiny: string;
    back_shiny_female: unknown;
    front_default: string;
    front_female: unknown;
    front_shiny: string;
    front_shiny_female: unknown;
    other: {
      dream_world: {
        front_default: string;
        front_female: unknown;
      };
      home: {
        front_default: string;
        front_female: unknown;
        front_shiny: string;
        front_shiny_female: unknown;
      };
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
      showdown: {
        back_default: string;
        back_female: unknown;
        back_shiny: string;
        back_shiny_female: unknown;
        front_default: string;
        front_female: unknown;
        front_shiny: string;
        front_shiny_female: unknown;
      };
    };
    versions: {
      "generation-i": {
        "red-blue": {
          back_default: string;
          back_gray: string;
          front_default: string;
          front_gray: string;
        };
        yellow: {
          back_default: string;
          back_gray: string;
          front_default: string;
          front_gray: string;
        };
      };
      "generation-ii": {
        crystal: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
        gold: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
        silver: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
      };
      "generation-iii": {
        emerald: {
          front_default: string;
          front_shiny: string;
        };
        "firered-leafgreen": {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
        "ruby-sapphire": {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
      };
      "generation-iv": {
        "diamond-pearl": {
          back_default: string;
          back_female: unknown;
          back_shiny: string;
          back_shiny_female: unknown;
          front_default: string;
          front_female: unknown;
          front_shiny: string;
          front_shiny_female: unknown;
        };
        "heartgold-soulsilver": {
          back_default: string;
          back_female: unknown;
          back_shiny: string;
          back_shiny_female: unknown;
          front_default: string;
          front_female: unknown;
          front_shiny: string;
          front_shiny_female: unknown;
        };
        platinum: {
          back_default: string;
          back_female: unknown;
          back_shiny: string;
          back_shiny_female: unknown;
          front_default: string;
          front_female: unknown;
          front_shiny: string;
          front_shiny_female: unknown;
        };
      };
      "generation-v": {
        "black-white": {
          animated: {
            back_default: string;
            back_female: unknown;
            back_shiny: string;
            back_shiny_female: unknown;
            front_default: string;
            front_female: unknown;
            front_shiny: string;
            front_shiny_female: unknown;
          };
          back_default: string;
          back_female: unknown;
          back_shiny: string;
          back_shiny_female: unknown;
          front_default: string;
          front_female: unknown;
          front_shiny: string;
          front_shiny_female: unknown;
        };
      };
      "generation-vi": {
        "omegaruby-alphasapphire": {
          front_default: string;
          front_female: unknown;
          front_shiny: string;
          front_shiny_female: unknown;
        };
        "x-y": {
          front_default: string;
          front_female: unknown;
          front_shiny: string;
          front_shiny_female: unknown;
        };
      };
      "generation-vii": {
        icons: {
          front_default: string;
          front_female: unknown;
        };
        "ultra-sun-ultra-moon": {
          front_default: string;
          front_female: unknown;
          front_shiny: string;
          front_shiny_female: unknown;
        };
      };
      "generation-viii": {
        icons: {
          front_default: string;
          front_female: unknown;
        };
      };
    };
  };
  cries: {
    latest: string;
    legacy: string;
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  past_types: Array<{
    generation: {
      name: string;
      url: string;
    };
    types: Array<{
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }>;
  }>;
  past_abilities: Array<{
    generation: {
      name: string;
      url: string;
    };
    abilities: Array<{
      ability: unknown;
      is_hidden: boolean;
      slot: number;
    }>;
  }>;
}
