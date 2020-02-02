import randomizeGaiaProject from "./randomizeGaiaProject";

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
  expect(result1.bonusFederationToken).not.toEqual(result2.bonusFederationToken);
});

it("result has 6 advanced research tiles token different per seed", async () => {
  const result1 = await randomizeGaiaProject({ seed: 0 });
  const result2 = await randomizeGaiaProject({ seed: 100 });
  expect(result1.advancedTechTiles.length).toEqual(6);
  expect(result1.advancedTechTiles).not.toEqual(
    result2.advancedTechTiles
  );
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
  expect(result1.roundBonusTiles.length).toEqual(6);
  expect(result1.roundBonusTiles).not.toEqual(result2.roundBonusTiles);
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
  expect(result1.bonusFederationToken).not.toEqual(result2.bonusFederationToken);
});

it("result has 4 races different per seed", async () => {
  const result1 = await randomizeGaiaProject({ seed: 0 });
  const result2 = await randomizeGaiaProject({ seed: 100 });
  expect(result1.playerRaces.length).toEqual(4);
  expect(result1.playerRaces).not.toEqual(result2.playerRaces);
});
