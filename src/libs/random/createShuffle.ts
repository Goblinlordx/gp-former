import RNG from "../../types/RNG";
import normalizeInt from "./normalizeInt";

// Fisher-Yates shuffle (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
const createShuffle = (rng: RNG) =>
  function <T>(arr: T[]) {
    const copy = arr.slice();
    let currentIndex: number = copy.length;
    let tmp = copy[currentIndex];
    let rIdx: number = 0;
    while (0 !== currentIndex) {
      rIdx = normalizeInt(rng(), currentIndex);
      currentIndex--;

      tmp = copy[currentIndex];
      copy[currentIndex] = copy[rIdx];
      copy[rIdx] = tmp;
    }
    return copy;
  };

export default createShuffle;
