import createPrng from "./createPrng";
import createSelector from "./createSelector";

const initSelector = (seed?: number) => createSelector(createPrng(seed));

it("runs without crashing", () => {
  const select = initSelector();
  const items = [1, 2, 3];
  const selection = select(items);
  expect(selection).toBeTruthy();
});

it("selects one of the items", () => {
  const select = initSelector();
  const items = [1, 2, 3];
  const selection = select(items);
  for (let i = 0; i < 30; i++) {
    const exists = items.some((v) => selection === v);
    expect(exists).toBeTruthy();
  }
});
