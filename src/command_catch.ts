import {
  THROW_OKAY,
  THROW_GREAT,
  THROW_GOOD,
  THROW_LAZY,
  THROW_INCREDIBLE,
  DIFFICULTY_EASY,
  DIFFICULTY_HARD,
  DIFFICULTY_MEDIUM,
  DIFFICULTY_VERY_EASY,
  DIFFICULTY_VERY_HARD,
  EMPTY_ARR,
  DIFFICULTY_NONE,
} from "./constants.js";
import type { State } from "./state.js";

export async function commandCatch(
  state: State,
  ...args: string[]
): Promise<void> {
  if (args.length === EMPTY_ARR) {
    console.log(`No pokemon targeted. Enter a pokemon to throw at!`);
  }

  const stateRef = state;
  const [target] = args;

  const pokemon = await stateRef.api.getPokemon(target);

  console.log(`\nThrowing a Pokeball at ${target}...`);

  const throwResult = Math.random();
  let caught = false;

  switch (true) {
    case throwResult >= THROW_INCREDIBLE:
      caught = true;
      break;
    case inBracket(throwResult, THROW_GREAT, THROW_INCREDIBLE):
      if (pokemon.base_experience < DIFFICULTY_VERY_HARD) {
        caught = true;
      }
      break;
    case inBracket(throwResult, THROW_GOOD, THROW_GREAT):
      if (pokemon.base_experience < DIFFICULTY_HARD) {
        caught = true;
      }
      break;
    case inBracket(throwResult, THROW_OKAY, THROW_GOOD):
      if (pokemon.base_experience < DIFFICULTY_MEDIUM) {
        caught = true;
      }
      break;
    case inBracket(throwResult, THROW_LAZY, THROW_OKAY):
      if (pokemon.base_experience < DIFFICULTY_EASY) {
        caught = true;
      }
      break;
    case inBracket(throwResult, DIFFICULTY_NONE, THROW_LAZY):
      if (pokemon.base_experience < DIFFICULTY_VERY_EASY) {
        caught = true;
      }
      break;
    default:
      break;
  }

  if (caught) {
    stateRef.pokedex[target] = pokemon;
    console.log(`You caught ${target}!\n`);
  } else {
    console.log(`You missed the pokemon!`);
  }
}

function inBracket(
  input: number,
  moreOrEqualTo: number,
  lessThan: number,
): boolean {
  return input >= moreOrEqualTo && input < lessThan;
}
