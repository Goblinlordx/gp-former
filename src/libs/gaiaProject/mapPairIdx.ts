import mapTiles, { SectorConfig } from "./mapTiles";

const sumSequence = (n: number) => (n / 2) * (n + 1);

export const tileCount = Object.keys(mapTiles).length;
export const tileIdx = Object.keys(mapTiles)
  .filter((x) => x !== "0")
  .reduce<Record<string, number>>((a, k, i) => {
    a[k] = i;
    return a;
  }, {});

/*
 * Pairs counted as an arithmatic sequence (3 tiles = [1, 2], [1, 3], [2, 3] -> 3 pairs).
 * Each tile has 6 sides and so between each pair there are 6^2 combinations of rotations.
 * This results in ((left idx * sequence sum + right idx) * 6^2) + (left rotation * 6^1) + right rotation
 */
export const pairToIdx = (pair: [SectorConfig, SectorConfig]): number => {
  const [left, right] = pair;
  const [lid, lrot] = left;
  const [rid, rrot] = right;
  if (tileIdx[lid] < tileIdx[rid]) {
    return (
      (sumSequence(tileIdx[lid]) + tileIdx[rid]) * 6 ** 2 + lrot * 6 + rrot
    );
  }
  return (
    (sumSequence(tileIdx[rid]) + tileIdx[lid]) * 6 ** 2 +
    ((rrot + (3 % 6)) * 6 + lrot)
  );
};
