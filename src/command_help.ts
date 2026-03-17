import { cmdRegistry } from "./commander.js"

export function commandHelp(registry: cmdRegistry): void {
  console.log(`Welcome to the Pokedex!\nUsage:\n`);
  for (const [_, v] of Object.entries(registry)) {
    console.log(`${v.name}: ${v.description}`)
  }
};
