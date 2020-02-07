import { oddrOffsetNeighbor, offsetDistance } from "../map/hex";
import { pairToIdx } from "./mapPairIdx";
import { buildMap } from "./mapTiles";
import hexTypes from "./hexTypes";
import raw from "raw.macro";
import deserialize from "../serialization/deserialize";

const { p1, p2, p3, p4, p5, p6, p7 } = hexTypes;

const rawCache = raw("./ruleNav3Match.cache");
const cache = deserialize(rawCache);

const getWithinDist = (map, coord, dist = 3) =>
  map.reduce((a, row, y) => {
    row.forEach((_, x) => {
      const tdist = offsetDistance(coord, [x, y]);
      if (tdist > 0 && tdist <= dist) a.push([x, y]);
    });
    return a;
  }, []);

const invalidMatchingTypes = [p1, p2, p3, p4, p5, p6, p7].reduce((a, k) => {
  a[k] = true;
  return a;
}, {});

export const validatePair = pair => {
  const cacheIdx = pairToIdx(pair);
  if (cache[cacheIdx] != null) return true;
  const map = buildMap([pair]);
  return !map.some((row, y) =>
    row.some(
      (hex, x) =>
        invalidMatchingTypes[hex] &&
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
        a.push(pair);
      }
    });
    return a;
  }, []);
  let invalidPair;
  pairs.some(pair => {
    const valid = validatePair(pair);
    if (!valid) invalidPair = pair;
    return invalidPair;
  });
  return invalidPair;
};
