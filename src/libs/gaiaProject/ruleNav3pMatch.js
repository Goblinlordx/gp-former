import { oddrOffsetNeighbor } from "../map/hex";
import { pairToIdx } from "./mapPairIdx";
import { buildMap, getWithinDist } from "./mapTiles";
import HexType from "./HexType";
import raw from "raw.macro";
import deserialize from "../serialization/deserialize";

const { empty, p1, p2, p3, p4, p5, p6, p7 } = HexType;

const rawCache = raw("./ruleNav3pMatch.cache");
const cache = deserialize(rawCache);

const invalidMatchingTypes = [p1, p2, p3, p4, p5, p6, p7].reduce((a, k) => {
  a[k] = true;
  return a;
}, {});

const premadeMap = Array(6)
  .fill(null)
  .map(() => Array(10).fill(empty));
export const validatePair = (pair) => {
  const cacheIdx = pairToIdx(pair);
  if (cache[cacheIdx] != null) return true;
  const map = buildMap([pair], premadeMap);
  return !map.some((row, y) =>
    row.some(
      (hex, x) =>
        invalidMatchingTypes[hex] &&
        getWithinDist(map, [x, y])
          .map(([cx, cy]) => map[cy][cx])
          .some((chex) => chex === hex)
    )
  );
};

export default function ruleNav3pMatch(layout) {
  const checked = {};
  const pairs = layout.reduce((a, row, y) => {
    row.forEach((cell, x) => {
      const [id, rot] = cell;
      checked[id] = true;
      if (!id) return;
      for (let dir = 0; dir < 6; dir++) {
        const [nx, ny] = oddrOffsetNeighbor([x, y], dir);
        if (nx < 0 || ny < 0 || nx >= row.length || ny >= layout.length) return;
        const neighbor = layout[ny][nx] || [0, 0];
        const [nid, nrot] = neighbor;
        if (!nid || checked[nid]) return;
        const pair = [
          [id, (rot + dir) % 6],
          [nid, (nrot + dir) % 6],
        ];
        a.push(pair);
      }
    });
    return a;
  }, []);
  let invalidPair;
  pairs.some((pair) => {
    const valid = validatePair(pair);
    if (!valid) invalidPair = pair;
    return invalidPair;
  });
  return invalidPair;
}
