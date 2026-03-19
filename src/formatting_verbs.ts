/*
  The following types exist to provide this client with a means
  of easily interpolating arguments into URL path parameters.

  It is made to work like Go's formatting verbs.

  Support only exists for strings.
  For now, interpStringVerbs expects operands in variadic form,
  for ease writing. This may need to change, however, as variadics
  may wrongfully suggest that the operands are optional altogether,
  which is NOT THE CASE.

  To avoid throwing errors, calling interpStringVerbs DEMANDS an
  operand for EVERY instance of '%s' within the original string.
 */

export const sVerb = "%s"

export function interpStringVerbs(original: string, ...operands: string[]): string {
  if (operands.length === 0) {
    throw new Error("no operands provided for interpolation")
  }
  for (let i = 0; i < operands.length; i++) {
    if (!(original.includes(sVerb))) {
      throw new Error(`interpStringVerbs format %s reads arg #${i}, but call has ${i - 1} ${i - 1 === 0 ? "arg" : "args"}`);
    }
    original = original.replace("%s", operands[i]);
  }

  return original;
}

