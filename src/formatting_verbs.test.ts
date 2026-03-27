import { interpStringVerbs, sVerb } from "./formatting_verbs.js";
import { test } from "vitest";

// these tests use a hypothetical endpoints to test 
// for nested resources, as one might find in a REST API.

const baseURL = "https://example.com";
const apiURL = `${baseURL}/api`;
const pathParam = `/${sVerb}`;

const testURLTrainers = `${apiURL}/trainers`;
const testURLTrainer = testURLTrainers + pathParam;

// damn you, invariant plurality!
const testURLTrainerPokemons = `${testURLTrainer}/pokemon`;
const testURLTrainerPokemon = testURLTrainerPokemons + pathParam;

test("verb interp with no operands throws err", ({ expect }) => {
  expect(() => interpStringVerbs(testURLTrainer)).toThrow(/no operands/v);
});

test("verb interp with too many operands throws err", ({ expect }) => {
  expect(() =>
    interpStringVerbs(testURLTrainerPokemons, "ash_id", "pikachu_id"),
  ).toThrow(/reads arg/v);
});

test("verb interp returns expected string", ({ expect }) => {
  const interpolated = interpStringVerbs(testURLTrainerPokemon, "ash_id", "pikachu_id");
  const expected = "https://example.com/api/trainers/ash_id/pokemon/pikachu_id";
  expect(interpolated).toBe(expected);
});
