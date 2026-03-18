import { State } from "./state.js"

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
  if (args?.length === 0) {
    console.log(`No pokemon targeted. Enter a pokemon to throw at!`);
    return Promise.resolve();
  }

  let target = args[0]

  const pokemon = await state.api.getPokemon(target);

  console.log(`\nThrowing a Pokeball at ${target}...`);

  const throwResult = Math.random() * 100;
  let caught = false;

  switch (true) {
    case throwResult >= 95:
      caught = true;
      break;
    case inBracket(throwResult, 80, 95):
      if (pokemon.base_experience < 275) {
        caught = true;
      }
      break;
    case inBracket(throwResult, 70, 80):
      if (pokemon.base_experience < 220) {
        caught = true;
      }
      break;
    case inBracket(throwResult, 50, 70):
      if (pokemon.base_experience < 120) {
        caught = true;
      }
      break;
    case inBracket(throwResult, 30, 50):
      if (pokemon.base_experience < 90) {
        caught = true;
      }
      break;
    case inBracket(throwResult, 0, 30):
      if (pokemon.base_experience < 45) {
        caught = true;
      }
      break;
  }

  if (caught) {
    state.pokedex[target] = pokemon;
    console.log(`You caught ${target}!\n`)
  } else {
    console.log(`You missed the pokemon!`)
  }

  return
}

function inBracket(input: number, moreOrEqualTo: number, lessThan: number): boolean {
  return input >= moreOrEqualTo && input < lessThan;
}
