import createPrng from "./createPrng";

it("runs with no parameters", () => {
  const rng = createPrng();
  expect(rng).toBeTruthy();
});

const printArr = arr => arr.join(", ");

const comparisonSeeds = [
  [0, 1],
  [1, 2],
  [1, 10]
];

const getIterations = (rng, cycles) =>
  Array(cycles)
    .fill(0)
    .map(rng);

it("returns same values given same seed", () => {
  const rng1 = createPrng();
  const rng2 = createPrng();
  const results1 = getIterations(rng1, 1000);
  const results2 = getIterations(rng2, 1000);
  const equal = results1.every((v, i) => v === results2[i]);
  expect(equal).toBeTruthy();
});

comparisonSeeds.forEach(([left, right]) => {

  it(`generates different numbers from different seeds: ${printArr([
    left,
    right
  ])}`, () => {
    const lPrng = createPrng(left);
    const rPrng = createPrng(right);

    const leftSet = new Set(getIterations(lPrng, 1000));
    const rightSet = new Set(getIterations(rPrng, 1000));
    const match = [...rightSet].some(v => leftSet.has(v));
    expect(match).not.toBeTruthy();
  });
});

const seedRepeats = [0, 1, 100, 3211, 0xFF, 0xFFFF];

seedRepeats.forEach(testSeed => {
  it(`generates a non-repeating set of values: ${testSeed}`, () => {
    const prng = createPrng(testSeed);

    const sequence1 = new Set(getIterations(prng, 5000));
    const sequence2 = new Set(getIterations(prng, 5000));

    const match = [...sequence1].some(v => sequence2.has(v));
    expect(match).not.toBeTruthy();
  })
});

// TODO [BMB]: Test for even distribution in generated values
