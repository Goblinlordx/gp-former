import RNG from "../../types/RNG";
import normalizeInt from "./normalizeInt";

export default (rng: RNG) =>
  function <T>(items: T[]) {
    return items[normalizeInt(rng(), items.length)];
  };
