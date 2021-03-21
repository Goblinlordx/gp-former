import hexTypes from "./hexTypes";
import { buildMap, getWithinDist } from "./mapTiles";
const { empty, space } = hexTypes;

const typesToCheck = Object.values(hexTypes).filter(
  (type) => ![empty, space].some((excluded) => excluded === type)
);

const typeSet = new Set(typesToCheck);

export default function ruleNav2Access(layout) {
  const map = buildMap(layout);
  const state = typesToCheck.reduce((a, k) => {
    a[k] = new Set();
    return a;
  }, {});
  map.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (!typeSet.has(cell)) return;
      state[cell].add(cell);
      getWithinDist(map, [x, y], 2).forEach(([nx, ny]) => {
        const near = map[ny][nx];
        if (!typeSet.has(near)) return;
        state[cell].add(near);
        state[near].add(cell);
      });
    });
  });
  return typesToCheck.reduce((a, k) => {
    return a && typesToCheck.every((kk) => state[k].has(kk));
  }, true)
    ? undefined
    : [];
}
