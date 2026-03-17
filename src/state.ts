import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { createInterface, type Interface } from "readline";

export type State = {
  registry: cmdRegistry;
  rl: Interface
}

export function initState(): State {
  return {
    registry: getCommands(),
    rl: createInterface(
      {
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",

      }
    )
  };
}

type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
}
export type cmdRegistry = Record<string, CLICommand>

export function getCommands(): cmdRegistry {
  return {
    exit: {
      name: "exit",
      description: "Exit the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
  };
}

