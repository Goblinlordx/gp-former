// import createPrng from "../random/createPrng";
// import generateMap from "./generateMap";
import ruleNav2Access from "./ruleNav2Access";

it("returns undefined if map is valid", () => {
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
  expect(ruleNav2Access(layout)).toEqual([]);
});

it("returns invalid set appropriately", () => {});

it("can be used to successfully create a map", () => {});
