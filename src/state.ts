import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_map.js";
import { createInterface, type Interface } from "readline";
import { PokeAPI } from "./pokeapi.js";

export type State = {
  api: PokeAPI;
  registry: cmdRegistry;
  rl: Interface;
  nextLocationsURL: string;
  prevLocationsURL: string;
}

export function initState(): State {
  return {
    api: new PokeAPI(),
    registry: getCommands(),
    rl: createInterface(
      {
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",

      }
    ),
    nextLocationsURL: "",
    prevLocationsURL: "",
  };
}

type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
}
export type cmdRegistry = Record<string, CLICommand>

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
    help: {
      name: "help",
      description: "Show usage instructions (this)",
      callback: commandHelp,
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
  };
}

