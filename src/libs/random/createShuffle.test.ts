import createPrng from "./createPrng";
import createShuffle from "./createShuffle";

it("result has same number of elements as input", () => {
  const rng = createPrng();
  const shuffle = createShuffle(rng);
  const arr = [1, 2, 3, 4, 5];
  const result = shuffle(arr);
  expect(result.length).toEqual(arr.length);
});

it("result has same elements as input", () => {
  const rng = createPrng();
  const shuffle = createShuffle(rng);
  const arr = [1, 2, 3, 4, 5];
  const result = new Set(shuffle(arr));
  const hasAll = arr.every((v) => result.has(v));
  expect(hasAll).toBeTruthy();
});

it("result has different order than original", () => {
  const rng = createPrng();
  const shuffle = createShuffle(rng);
  const arr = [1, 2, 3, 4, 5];
  const result = shuffle(arr);
  const equal = arr.every((v, i) => v === result[i]);
  expect(equal).not.toBeTruthy();
});
