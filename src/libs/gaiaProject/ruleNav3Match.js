import { oddrOffsetNeighbor, offsetDistance } from "../map/hex";
import { pairToIdx } from "./mapPairIdx";
import { buildMap } from "./mapTiles";
import raw from "raw.macro";
import deserialize from "../serialization/deserialize";

const rawCache = raw("./ruleNav3Match.cache");
const cache = deserialize(rawCache);

const getWithinDist = (map, coord) =>
  map.reduce((a, row, y) => {
    row.forEach((_, x) => {
      if (map[y] && map[y][x] && offsetDistance(coord, [x, y])) a.push([x, y]);
    });
    return a;
  }, []);

export const validatePair = pair => {
  const cacheIdx = pairToIdx(pair);
  if (cache[cacheIdx] != null) return true;
  const map = buildMap([pair]);
  return map.some((row, y) =>
    row.some((hex, x) =>
      getWithinDist(map, [x, y])
        .map(([cx, cy]) => map[cy][cx])
        .some(chex => chex === hex)
    )
  );
};

export default layout => {
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
          [nid, (nrot + dir) % 6]
        ];
        pair.sort(([a], [b]) => a - b);
        a.push(pair);
      }
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
