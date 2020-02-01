import normalizeInt from "./normalizeInt";

// Fisher-Yates shuffle (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
const createShuffle = rng => arr => {
  const copy = arr.slice();
  let currentIndex = copy.length;
  let tmp = 0;
  let rIdx = 0;
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
