import hash from "./hash";

it("runs with no parameters", () => {
  expect(hash()).toBeTruthy();
});

it("runs generates hash value different from input", () => {
  const input = 0;
  expect(hash(input)).not.toBe(input);
});

it("runs generates numeric hash value", () => {
  const input = 0;
  expect(typeof hash(input)).toBe("number");
});

it("runs can accept a string", () => {
  const input = "test value";
  expect(typeof hash(input)).toBe("number");
});

const diffPairs = [
  [0, 1],
  [-1, 1],
  [1, 2],
  [1000, 1001],
  ["2", 2],
  ["Test", "Test1"],
  ["abcd", "abce"],
  ["abcd", "bbcd"],
];
const printPair = (left: string | number, right: string | number) =>
  `${typeof left}(${left}), ${typeof right}(${right})`;

diffPairs.forEach(([left, right]) => {
  it(`generates a different hash for the values: ${printPair(
    left,
    right
  )}`, () => {
    const leftResult = hash(left);
    const rightResult = hash(right);
    expect(leftResult).not.toBe(rightResult);
  });
});
