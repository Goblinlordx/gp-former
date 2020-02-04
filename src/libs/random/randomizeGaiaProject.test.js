import randomizeGaiaProject from "../gaiaProject/randomizeGaiaProject";

it("runs without crashing", async () => {
  const result = randomizeGaiaProject({ seed: 0 });
  expect(result).toBeTruthy();
});

it("runs without crashing", async () => {
  const result = randomizeGaiaProject({ seed: 0 });
  expect(result).toBeTruthy();
});

it("returns same result given same seed", async () => {
  const result1 = randomizeGaiaProject({ seed: 0 });
  const result2 = randomizeGaiaProject({ seed: 0 });
  expect(result1).toEqual(result2);
});

it("result has 1 federation token different per seed", async () => {
  const result1 = await randomizeGaiaProject({ seed: 0 });
  const result2 = await randomizeGaiaProject({ seed: 100 });
  expect(typeof result1.bonusFederationToken).toEqual("number");
  expect(result1.bonusFederationToken).not.toEqual(
    result2.bonusFederationToken
  );
});

it("result has 6 advanced research tiles token different per seed", async () => {
  const result1 = await randomizeGaiaProject({ seed: 0 });
  const result2 = await randomizeGaiaProject({ seed: 100 });
  expect(result1.advancedTechTiles.length).toEqual(6);
  expect(result1.advancedTechTiles).not.toEqual(result2.advancedTechTiles);
});

it("result has 9 research tiles token with different order per seed", async () => {
  const result1 = await randomizeGaiaProject({ seed: 0 });
  const result2 = await randomizeGaiaProject({ seed: 100 });
  expect(result1.techTiles.length).toEqual(9);
  expect(result1.techTiles).not.toEqual(result2.techTiles);
});

it("result has 6 round bonus tiles token different per seed", async () => {
  const result1 = await randomizeGaiaProject({ seed: 0 });
  const result2 = await randomizeGaiaProject({ seed: 100 });
  expect(result1.roundScoringTiles.length).toEqual(6);
  expect(result1.roundScoringTiles).not.toEqual(result2.roundScoringTiles);
});

it("result has 2 final scoring tiles token different per seed", async () => {
  const result1 = await randomizeGaiaProject({ seed: 0 });
  const result2 = await randomizeGaiaProject({ seed: 100 });
  expect(result1.finalScoringTiles.length).toEqual(2);
  expect(result1.finalScoringTiles).not.toEqual(result2.finalScoringTiles);
});

it("result has 7 round boosters different per seed", async () => {
  const result1 = await randomizeGaiaProject({ seed: 0 });
  const result2 = await randomizeGaiaProject({ seed: 100 });
  expect(result1.roundBoosters.length).toEqual(7);
  expect(result1.bonusFederationToken).not.toEqual(
    result2.bonusFederationToken
  );
});

it("result has 4 races different per seed", async () => {
  const result1 = await randomizeGaiaProject({ seed: 0 });
  const result2 = await randomizeGaiaProject({ seed: 100 });
  expect(result1.playerFactions.length).toEqual(4);
  expect(result1.playerFactions).not.toEqual(result2.playerFactions);
});

it("result appropriate number of round boosters with 2 players", async () => {
  const { roundBoosters } = await randomizeGaiaProject({
    seed: 0,
    playerCount: 2
  });
  expect(roundBoosters.length).toEqual(5);
});

it("result appropriate number of round boosters with 2 players", async () => {
  const { playerFactions } = await randomizeGaiaProject({
    seed: 0,
    playerCount: 2
  });
  expect(playerFactions.length).toEqual(2);
});

it("result same with different player count except for round boosters and factions", async () => {
  const {
    roundBoosters,
    playerFactions,
    ...result1
  } = await randomizeGaiaProject({ seed: 0 });
  const {
    roundBoosters: _,
    playerFactions: __,
    ...result2
  } = await randomizeGaiaProject({ seed: 0, playerCount: 2 });

  expect(result1).toEqual(result2);
});
