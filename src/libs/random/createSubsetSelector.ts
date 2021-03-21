import RNG from "../../types/RNG";
import createShuffle from "./createShuffle";

const createSubsetSelector = (rng: RNG) => {
  const s = createShuffle(rng);
  return function<T>(items: T[], n: number) {
    return s(items).slice(0, n);
  };
};

export default createSubsetSelector;
