import { rotTile } from "./hex";

const exampleTile = [
  [31, 212, 21, 22, 32],
  [211, 16, 11, 12, 23],
  [210, 15, 1, 13, 24],
  [29, 28, 14, 26, 25],
  [36, 35, 27, 34, 33],
];

it("doesn't alter original tile", () => {
  const str = JSON.stringify(exampleTile);
  rotTile(exampleTile, 1);
  expect(str).toEqual(JSON.stringify(exampleTile));
});

it("doesn't alter original tile", () => {
  const rotated = rotTile(exampleTile, 1);
  expect(JSON.stringify(rotated)).toMatchInlineSnapshot(
    `"[[31,210,211,212,32],[29,15,16,11,21],[28,14,1,12,22],[27,26,13,24,23],[36,35,25,34,33]]"`
  );
});

it("6 rotations results in same tile", () => {
  const rotated = rotTile(exampleTile, 6);
  expect(rotated).toEqual(exampleTile);
});
