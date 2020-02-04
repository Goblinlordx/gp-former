const cubeDistance = (a, b) =>
  (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z)) / 2;

const oddqToCube = hex => ({
  x: hex.col,
  z: hex.row - (hex.col - (hex.col & 1)) / 2,
  y: -x - zd
});

const offsetDistance = (a, b) => cubeDistance(oddqToCube(a), oddqToCube(b));
