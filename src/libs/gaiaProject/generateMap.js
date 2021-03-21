import createSubsetSelector from "../random/createSubsetSelector";
import createSelector from "../random/createSelector";
import createShuffle from "../random/createShuffle";

const emptyTileID = 0;

const TIMEOUT = 200; // Timeout in ms
const MAX_ITERATIONS = 5 * 10 ** 4;

export class ImpossibleError extends Error {}
export class IterationError extends Error {}
export class TimeoutError extends Error {}

const numToRot = (size, n) =>
  ("0".repeat(size) + n.toString(6))
    .split("")
    .slice(-size)
    .map((x) => parseInt(x, 10))
    .reverse();

const rotToNum = (rots) => parseInt(rots.reverse().join(""), 6);

const rotIdx = (n, idx) => n + 6 ** idx;

const fillLayout = (rng, tileSet, layout) => {
  const tileCount = layout.reduce((a, row) => {
    row.forEach((x) => {
      if (x) a++;
    });
    return a;
  }, 0);
  if (tileCount > tileSet.length) new Error("Not enough tiles to fill layout");
  const selectSubset = createSubsetSelector(rng);
  const select = createSelector(rng);
  const rotations = Array(6)
    .fill(0)
    .map((_, i) => i);
  const selectedTiles = selectSubset(tileSet, tileCount).map((tile) =>
    Array.isArray(tile) ? select(tile) : tile
  );

  return layout.reduce((a, row) => {
    const outputRow = [];
    row.forEach((v) => {
      if (v) {
        outputRow.push([selectedTiles.pop(), select(rotations)]);
      } else {
        outputRow.push([emptyTileID, 0]);
      }
    });
    a.push(outputRow);
    return a;
  }, []);
};

const generateCycle = (
  rng,
  tileSet,
  layoutInput,
  strategies = [],
  config = {}
) => {
  const maxIter = config.maxIterations;
  const timeout = config.timeout;
  const start = config.start;
  const shuffle = createShuffle(rng);
  let layout = fillLayout(rng, tileSet, layoutInput);
  const rotOrder = shuffle(
    layout.reduce((a, row) => {
      row.forEach(([id]) => {
        if (id) a.push(id);
      });
      return a;
    }, [])
  );
  const rotations = layout.reduce((a, row) => {
    row.forEach(([id, rot]) => {
      if (!id) return;
      a[rotOrder.indexOf(id)] = rot;
    });
    return a;
  }, Array(rotOrder.length).fill(0));

  const maxPossibleIter = 6 ** rotOrder.length;
  const checked = [];
  let current = rotToNum(rotations);
  let iteration = 0;
  while (true) {
    checked[current] = true;
    iteration++;
    const invalidSet = strategies.reduce((invalid, strat) => {
      if (invalid) return invalid;
      return strat(layout);
    }, null);
    if (!invalidSet) break;
    if (iteration >= maxPossibleIter)
      throw new ImpossibleError("impossible map layout");
    if (iteration >= maxIter)
      throw new IterationError("max iterations reached generating map");
    if (Date.now() - start > timeout)
      throw new TimeoutError(`timeout generating map: ${iteration}`);
    // TODO: Implement update rotations for next iteration
    // eslint-disable-next-line no-loop-func
    const found = invalidSet.some((id) => {
      const idx = rotOrder.indexOf(id);
      let next = current;
      for (let i = 0; i < 6; i++) {
        next = rotIdx(next, idx);
        if (!checked[next]) {
          current = next;
          return true;
        }
      }
      return false;
    });
    if (found) break;
    for (let i = 0; i < maxPossibleIter; i++) {
      current = (current + 1) % maxPossibleIter;
      if (!checked[current]) break;
    }
  }
  const newRots = numToRot(rotOrder.length, current);
  layout.forEach((row) => {
    row.forEach((ref) => {
      if (!ref[0]) return;
      const idx = rotOrder.indexOf(ref[0]);
      ref[1] = newRots[idx];
    });
  });
  return layout;
};

const iterPerCycle = 6 ** 3; // rotate up to 3 tiles through all combinations

export default function generateMap(
  rng,
  tileSet,
  layoutInput,
  strategies = [],
  config = {}
) {
  const maxIter =
    typeof config.maxIterations === "number"
      ? config.maxIterations
      : MAX_ITERATIONS;
  const timeout = typeof config.timeout === "number" ? config.timeout : TIMEOUT;
  const start = Date.now();
  let current = 0;
  let i = 0;
  while (current < maxIter) {
    const nextIter = Math.min(iterPerCycle, Math.max(0, maxIter - current));
    let map;
    try {
      map = generateCycle(rng, tileSet, layoutInput, strategies, {
        maxIterations: nextIter,
        timeout,
        start,
      });
    } catch (err) {
      if (!(err instanceof IterationError)) {
        console.log(i, current);
        throw err;
      }
      current = nextIter;
      i += 1;
      continue;
    }
    return map;
  }
  throw new IterationError("max iterations exceeded");
}
