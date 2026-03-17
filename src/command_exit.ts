import { cmdRegistry } from "./commander.js"

export function commandExit(registry: cmdRegistry): void {
  console.log(`Closing the Pokedex... Goodbye!`);
  process.exit(0);
};
