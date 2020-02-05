import createSubsetSelector from "../random/createSubsetSelector";
import createSelector from "../random/createSelector";

const emptyTileID = 0;

const TIMEOUT = 200; // Timeout in ms
const MAX_ITERATIONS = 5 * 10 ** 4;

export class IterationError extends Error {}
export class TimeoutError extends Error {}

const fillLayout = (rng, tileSet, layout) => {
  const tileCount = layout.reduce((a, row) => {
    row.forEach(x => {
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
  const selectedTiles = selectSubset(tileSet, tileCount).map(tile =>
    Array.isArray(tile) ? select(tile) : tile
  );

  return layout.reduce((a, row) => {
    const outputRow = [];
    row.forEach(v => {
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

export default (rng, tileSet, layoutInput, strategies = [], config = {}) => {
  const maxIter =
    typeof config.maxIterations === "number"
      ? config.maxIterations
      : MAX_ITERATIONS;
  const timeout = typeof config.timeout === "number" ? config.timeout : TIMEOUT;
  let layout = fillLayout(rng, tileSet, layoutInput);
  const getSetOrder = l =>
    l.reduce((a, row) => {
      row.forEach(([id, rot]) => {
        a.push(id);
      });
      return a;
    }, []);
  let setOrder = getSetOrder(layout);
  if (!setOrder) console.log("ignore");
  const start = Date.now();
  let iteration = 0;
  while (true) {
    const [valid, invalidSet] = strategies.reduce(
      ([v, invalid], strat) => {
        if (!v) return [v, invalid];
        return strat(layout);
      },
      [true, []]
    );
    if (!invalidSet) console.log("ignore");
    if (valid) break;
    if (iteration >= maxIter)
      throw new IterationError("max iterations reached generating map");
    if (Date.now() - start > timeout)
      throw new TimeoutError("timeout generating map");
    // TODO: Implement update rotations for next iteration
    iteration++;
  }
  return layout;
};
