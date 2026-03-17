import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

type CLICommand = {
  name: string;
  description: string;
  callback: (commands: Record<string, CLICommand>) => void;
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

