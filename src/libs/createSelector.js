import normalizeInt from "./normalizeInt";

export default rng => items => items[normalizeInt(rng(), items.length)];
