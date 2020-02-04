import createShuffle from "./createShuffle";

const createSubsetSelector = rng => {
  const s = createShuffle(rng);
  return (items, n) => s(items).slice(0, n);
};

export default createSubsetSelector;
