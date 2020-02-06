import mapTiles from "./mapTiles";

const sumSequence = n => (n / 2) * (n + 1);

export const tileCount = Object.keys(mapTiles).length;
export const tileIdx = Object.keys(mapTiles)
  .filter(x => x !== "0")
  .reduce((a, k, i) => {
    a[k] = i;
    return a;
  }, {});

/*
 * Pairs counted as an arithmatic sequence (3 tiles = [1, 2], [1, 3], [2, 3] -> 3 pairs).
 * Each tile has 6 sides and so between each pair there are 6^2 combinations of rotations.
 * This results in ((left idx * sequence sum + right idx) * 6^2) + (left rotation * 6^1) + right rotation
 */
export const pairToIdx = ([[lid, lrot], [rid, rrot]]) =>
  (sumSequence(tileIdx[lid]) + tileIdx[rid]) * 6 ** 2 + lrot * 6 + rrot;
