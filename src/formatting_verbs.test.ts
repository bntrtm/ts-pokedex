import { interpStringVerbs, sVerb } from "./formatting_verbs.js";
import { test } from "vitest";

// these tests use a hypothetical 'trainers' endpoint,
// to test for nested resources as one might find in a REST API.

const baseURL = "https://example.com"
const pathParam = `/${sVerb}`
const testURLTrainers = baseURL + "/trainers"
const testURLTrainer = testURLTrainers + pathParam

// damn you, invariant plurality!
const testURLTrainerPokemons = testURLTrainer + "/pokemon"
const testURLTrainerPokemon = testURLTrainerPokemons + pathParam

test('verb interp with no operands throws err', ({ expect }) => {
  expect(() => interpStringVerbs(testURLTrainer)).toThrow(/no operands/);
})

test('verb interp with too many operands throws err', ({ expect }) => {
  expect(() => interpStringVerbs(testURLTrainerPokemons, "ash", "pikachu")).toThrow(/reads arg/);
})

test('verb interp returns expected string', ({ expect }) => {
  const interpolated = interpStringVerbs(testURLTrainerPokemon, "ash", "pikachu")
  const expected = "https://example.com/trainers/ash/pokemon/pikachu"
  expect(interpolated).toBe(expected);
})

