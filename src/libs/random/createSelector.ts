import RNG from "../../types/RNG";
import normalizeInt from "./normalizeInt";

export default function createSelector(rng: RNG) {
  return function selector<T>(items: T[]) {
    return items[normalizeInt(rng(), items.length)];
  };
}
