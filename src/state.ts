import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapb } from "./command_map.js";
import { createInterface, type Interface } from "node:readline";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";
import { PokeAPI, type Pokemon } from "./pokeapi.js";

export interface State {
  api: PokeAPI;
  registry: cmdRegistry;
  rl: Interface;
  nextLocationsURL: string;
  prevLocationsURL: string;
  pokedex: pokedex;
}

export type pokedex = Record<string, Pokemon>;

export function initState(cacheInterval: number): State {
  return {
    api: new PokeAPI(cacheInterval),
    registry: getCommands(),
    rl: createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "Pokedex > ",
    }),
    nextLocationsURL: "",
    prevLocationsURL: "",
    pokedex: {},
  };
}

interface CLICommand {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void> | void;
}
export type cmdRegistry = Record<string, CLICommand>;

export function getCommands(): cmdRegistry {
  return {
    explore: {
      name: "explore",
      description: "Given a location, list pokemon present",
      callback: commandExplore,
    },
    exit: {
      name: "exit",
      description: "Exit the pokedex",
      callback: commandExit,
    },
    catch: {
      name: "catch",
      description: "Throw a pokeball at a pokemon!",
      callback: commandCatch,
    },
    help: {
      name: "help",
      description: "Show usage instructions (this)",
      callback: commandHelp,
    },
    inspect: {
      name: "inspect",
      description: "See stats of a pokemon in your pokedex",
      callback: commandInspect,
    },
    map: {
      name: "map",
      description: "Display next 20 locations",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Display previous 20 locations",
      callback: commandMapb,
    },
    pokedex: {
      name: "pokedex",
      description: "List the pokemon you've caught",
      callback: commandPokedex,
    },
  };
}
