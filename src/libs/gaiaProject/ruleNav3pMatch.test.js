import createPrng from "../random/createPrng";
import generateMap from "./generateMap";
import ruleNav3pMatch from "./ruleNav3pMatch";

it("returns invalid set appropriately", () => {
  const layout = [
    [
      [0, 0],
      [2, 0],
      [1, 0],
      [0, 0],
    ],
    [
      [0, 0],
      ["7b", 5],
      [0, 0],
      [0, 0],
    ],
  ];
  expect(ruleNav3pMatch(layout)).toEqual([
    [2, 0],
    [1, 0],
  ]);
});

it("returns undefined if fine", () => {
  const layout = [
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [0, 0],
    ],
    [
      [0, 0],
      ["7b", 5],
      [0, 0],
      [0, 0],
    ],
  ];
  expect(ruleNav3pMatch(layout)).toEqual(undefined);
});

it("can be used to successfully create a map", () => {
  const rng = createPrng(0);
  const tiles = [1, 2, 3];
  const map = generateMap(rng, tiles, [[1, 1]], [ruleNav3pMatch]);
  expect(JSON.stringify(map)).toMatchInlineSnapshot(`"[[[1,2],[3,5]]]"`);
});
