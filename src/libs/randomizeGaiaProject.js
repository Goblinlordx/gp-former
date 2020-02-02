import hash from "./hash";
import createPrng from "./createPrng";
import createSelector from "./createSelector";
import createSubsetSelector from "./createSubsetSelector";
import createShuffle from "./createShuffle";
import sortInt from "./sortInt";

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

const randomizeGaiaProject = async ({ seed: inputSeed, playerCount = 4 }) => {
  if (playerCount < 2 || playerCount > 4)
    throw new Error("Invalid player count");
  const seed = hash(inputSeed);
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
      .sort()
  };
};

export default randomizeGaiaProject;
