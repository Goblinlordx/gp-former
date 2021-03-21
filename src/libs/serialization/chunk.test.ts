import chunk from "./chunk";

it("runs", () => {
  chunk([], 5);
});

it("creates appropriate chunk sizes", () => {
  const chunked = chunk(Array(8).fill(null), 2);
  const allSize2 = chunked.every((c) => c.length === 2);
  expect(allSize2).toBeTruthy();
});

it("creates appropriate chunk sizes with odd set", () => {
  const chunked = chunk(Array(7).fill(null), 2);
  const allSize2 = chunked.slice(0, 3).every((c) => c.length === 2);
  const lastSize1 = chunked[3].length === 1;
  expect(allSize2 && lastSize1).toBeTruthy();
});
