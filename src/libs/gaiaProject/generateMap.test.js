import createPrng from "../random/createPrng";
import generateMap, { IterationError, TimeoutError } from "./generateMap";

it("generates random set of proper dimensions: (1 x 2)", () => {
  const rng = createPrng(0);
  const map = generateMap(rng, [1, 2, 3, 4], [[1, 1]]);
  expect(map.length).toEqual(1);
  expect(map[0].length).toEqual(2);
});

it("generates random set of proper dimensions: (3 x 3)", () => {
  const rng = createPrng(0);
  const map = generateMap(
    rng,
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1]
    ]
  );
  expect(map[0].length).toEqual(3);
  expect(map.length).toEqual(3);
});

it("generates random set of proper dimensions: (4 x 3 with empty cells)", () => {
  const rng = createPrng(0);
  const map = generateMap(
    rng,
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [
      [0, 1, 1, 1],
      [1, 1, 1, 1],
      [0, 1, 1, 1]
    ]
  );
  expect(map[0].length).toEqual(4);
  expect(map.length).toEqual(3);
  expect(map[0][0]).toEqual([0, 0]);
  expect(map[2][0]).toEqual([0, 0]);
});

it("result contains only ids from those provided", () => {
  const rng = createPrng(0);
  const tiles = [1, 2, 3, 4];
  const tileSet = new Set(tiles);
  const map = generateMap(rng, tiles, [[0, 1, 1, 0]]);
  const inTileSet = map[0].every(([id]) => !id || tileSet.has(id));
  expect(inTileSet).toBeTruthy();
});

it("fails after too many itterations", () => {
  const alwaysInvalidStrategy = () => [false, []];
  const rng = createPrng(0);
  const tiles = [1, 2, 3, 4];
  let err;
  try {
    const map = generateMap(
      rng,
      tiles,
      [[0, 1, 1, 0]],
      [alwaysInvalidStrategy],
      {
        maxIterations: 1
      }
    );
  } catch (e) {
    err = e;
  }
  expect(err instanceof IterationError).toBeTruthy();
});

it("fails after timeout", () => {
  const alwaysInvalidStrategy = () => [false, []];
  const rng = createPrng(0);
  const tiles = [1, 2, 3, 4];
  let err;
  try {
    const map = generateMap(
      rng,
      tiles,
      [[0, 1, 1, 0]],
      [alwaysInvalidStrategy],
      {
        timeout: 1
      }
    );
  } catch (e) {
    err = e;
  }
  expect(err instanceof TimeoutError).toBeTruthy();
});
