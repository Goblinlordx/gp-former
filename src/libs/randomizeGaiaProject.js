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
const roundBonusTiles = createSet(7);
const roundBoosters = createSet(10);
const techTiles = createSet(9);
const advancedTechTiles = createSet(15);
const federationTiles = createSet(6);
const playerRaces = createSet(7);

const randomizeGaiaProject = async ({ seed: inputSeed }) => {
  const seed = hash(inputSeed);
  const prng = createPrng(seed);
  const shuffle = createShuffle(prng);
  const select = createSelector(prng);
  const selectSubset = createSubsetSelector(prng);
  return {
    bonusFederationTile: select(federationTiles),
    advancedTechTiles: selectSubset(advancedTechTiles, 6),
    techTiles: shuffle(techTiles, 9),
    roundBonusTiles: selectSubset(roundBonusTiles, 6).sort(sortInt),
    finalScoringTiles: selectSubset(finalScoringTiles, 2).sort(sortInt),
    roundBoosters: selectSubset(roundBoosters, 7),
    playerRaces: selectSubset(playerRaces, 4)
      .map(v => `${v}${selectSubset(["a", "b"], 1)[0]}`)
  };
};

export default randomizeGaiaProject;
