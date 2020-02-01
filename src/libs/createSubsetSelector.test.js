import createSubsetSelector from "./createSubsetSelector";
import createPrng from "./createPrng";

it("selects number of elements based on parameter", () => {
  const rng = createPrng();
  const selectSubset = createSubsetSelector(rng);
  const items = [1, 2, 3, 4, 5, 6, 7];

  const len1 = 5;
  const res1 = selectSubset(items, len1);
  expect(len1).toEqual(res1.length);

  const len2 = 3;
  const res2 = selectSubset(items, len2);
  expect(len2).toEqual(res2.length);
});

it("selects elements that exist inside array passed", () => {
  const rng = createPrng();
  const selectSubset = createSubsetSelector(rng);
  const items = [1, 2, 3, 4, 5, 6, 7];
  const origSet = new Set(items);
  const result = selectSubset(items, 3);
  const allExist = result.every(v => origSet.has(v));
  expect(allExist).toBeTruthy();
});

it("selects different subset each time", () => {
  const rng = createPrng();
  const selectSubset = createSubsetSelector(rng);
  const items = [1, 2, 3, 4, 5, 6, 7];
  const result1 = selectSubset(items, 3);
  const result2 = selectSubset(items, 3);
  expect(result1).not.toEqual(result2);
});
