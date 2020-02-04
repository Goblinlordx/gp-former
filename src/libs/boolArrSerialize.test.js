import boolArrSerialize from "./boolArrSerialize";
import boolArrDeserialize from "./boolArrDeserialize";

it("serializes and deserializes", () => {
  const str = boolArrSerialize(Array(52 * 8).fill(true));
  const arr = boolArrDeserialize(str);
  expect(arr.length).toBe(52 * 8);
  expect(arr.every(v => v)).toBe(true);
});
