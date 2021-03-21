import serialize from "./serialize";
import deserizlise from "./deserialize";

it("serializes and deserializes", () => {
  const str = serialize(Array(52 * 8).fill(true));
  const arr = deserizlise(str);
  expect(arr.length).toBe(52 * 8);
  expect(arr.every((v) => v)).toBe(true);
});
