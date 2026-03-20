import { cleanInput } from "./repl.js";
import { describe, expect, test } from "vitest";

describe.each([
  {
    input: "  ",
    expected: [],
  },
  {
    input: "  hello ",
    expected: ["hello"],
  },
  {
    input: " hello world ",
    expected: ["hello", "world"],
  },
  {
    input: "hELLO, WORLD!",
    expected: ["hello,", "world!"],
  },
  {
    input: " h Ello World",
    expected: ["h", "ello", "world"],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected.toString()}`, () => {
    const actual = cleanInput(input);

    expect(actual).toHaveLength(expected.length);
    for (let i = 0; i < expected.length; i += 1) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});
