import { oddrOffsetNeighbor } from "../map/hex";
import { pairToIdx } from "./mapPairIdx";
import { buildMap } from "./mapTiles";
import raw from "raw.macro";
import deserialize from "../serialization/deserialize";

const rawCache = raw("./ruleNav3Match.cache");
const cache = deserialize(rawCache);

export const validatePair = pair => {
  const cacheIdx = pairToIdx(pair);
  if (cache[cacheIdx] != null) return true;
  const map = buildMap([pair]);
  console.log(map);
};

export default layout => {
  const checked = {};
  const pairs = layout.reduce((a, row, y) => {
    row.forEach((cell, x) => {
      const [id, rot] = cell;
      checked[id] = true;
      if (!id) return;
      Array(6)
        .fill(0)
        .forEach((_, dir) => {
          const [nx, ny] = oddrOffsetNeighbor([x, y], dir);
          if (nx < 0 || ny < 0 || nx >= row.length || ny >= layout.length)
            return;
          const neighbor = layout[ny][nx] || [0, 0];
          const [nid, nrot] = neighbor;
          if (!nid || checked[nid]) return;
          const pair = [
            [id, (rot + dir) % 6],
            [nid, (nrot + dir) % 6]
          ];
          pair.sort(([a], [b]) => a - b);
          a.push(pair);
        }, []);
    });
    return a;
  }, []);
  let invalidPair;
  pairs.some(pair => {
    const res = validatePair(pair);
    if (res) invalidPair = res;
    return res;
  });
  return invalidPair;
};
