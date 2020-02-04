// Based on https://www.redblobgames.com/grids/hexagons/

const oddrDirections = [
  [
    [+1, 0],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, +1],
    [0, +1]
  ],
  [
    [+1, 0],
    [+1, -1],
    [0, -1],
    [-1, 0],
    [0, +1],
    [+1, +1]
  ]
];

var oddqDirections = [
  [
    [+1, 0],
    [+1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [0, +1]
  ],
  [
    [+1, +1],
    [+1, 0],
    [0, -1],
    [-1, 0],
    [-1, +1],
    [0, +1]
  ]
];

export const oddrOffsetNeighbor = (hex, direction) => {
  const parity = hex.row & 1;
  const dir = oddrDirections[parity][direction];
  return [hex.col + dir[0], hex.row + dir[1]];
};

export const oddqOffsetNeighbor = (hex, direction) => {
  const parity = hex.col & 1;
  const dir = oddqDirections[parity][direction];
  return [hex.col + dir[0], hex.row + dir[1]];
};

export const cubeDistance = (a, b) =>
  (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z)) / 2;

export const oddqToCube = hex => {
  const x = hex.col;
  const z = hex.row - (hex.col - (hex.col & 1)) / 2;
  const y = -x - z;
  return { x, y, z };
};

export const offsetDistance = (a, b) =>
  cubeDistance(oddqToCube(a), oddqToCube(b));
