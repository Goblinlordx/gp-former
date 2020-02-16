import hash from "../random/hash";
import createPrng from "../random/createPrng";
import createSelector from "../random/createSelector";
import createSubsetSelector from "../random/createSubsetSelector";
import createShuffle from "../random/createShuffle";
import sortInt from "../random/sortInt";
import generateMap from "./generateMap";

const createSet = n =>
  Array(n)
    .fill(0)
    .map((_, i) => i + 1);

const finalScoringTiles = createSet(6);
const roundScoringTiles = createSet(10);
const roundBoosters = createSet(10);
const techTiles = createSet(9);
const advancedTechTiles = createSet(15);
const federationTiles = createSet(6);
const playerFactions = createSet(7);

const generate = async ({ seed: inputSeed, playerCount = 4 }) => {
  if (playerCount < 2 || playerCount > 4)
    throw new Error("Invalid player count");
  const seed = hash(inputSeed || 0);
  const prng = createPrng(seed);
  const shuffle = createShuffle(prng);
  const select = createSelector(prng);
  const selectSubset = createSubsetSelector(prng);
  const roundBoosterCount = playerCount + 3;
  return {
    bonusFederationToken: select(federationTiles),
    advancedTechTiles: selectSubset(advancedTechTiles, 6),
    techTiles: shuffle(techTiles, 9),
    roundScoringTiles: selectSubset(roundScoringTiles, 6).sort(sortInt),
    finalScoringTiles: selectSubset(finalScoringTiles, 2).sort(sortInt),
    roundBoosters: selectSubset(roundBoosters, 7)
      .slice(0, roundBoosterCount)
      .sort(sortInt),
    playerFactions: selectSubset(playerFactions, 4)
      .map(v => `${v}${selectSubset(["a", "b"], 1)[0]}`)
      .slice(0, playerCount)
      .sort(),
    map: generateMap(
      prng,
      [1, 2, 3, 4, "5f", "6f", "7f", 8, 9, 10],
      [
        [0, 1, 1, 1],
        [1, 1, 1, 1],
        [0, 1, 1, 1]
      ]
    )
  };
};

export default generate;
