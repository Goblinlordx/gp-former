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
  const [x, y] = hex;
  const parity = y & 1;
  const dir = oddrDirections[parity][direction];
  return [x + dir[0], y + dir[1]];
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

const rots = [
  [],
  [
    [2, 1],
    [3, 1],
    [3, 2],
    [2, 3],
    [1, 2],
    [1, 1]
  ],
  [
    [2, 0],
    [3, 0],
    [4, 1],
    [4, 2],
    [4, 3],
    [3, 3],
    [2, 4],
    [1, 3],
    [0, 3],
    [0, 2],
    [0, 1],
    [1, 0]
  ]
];

export const cloneTile = tile => tile.map(row => row.slice());

export const rotTile = (tile, rot) => {
  const output = cloneTile(tile);
  rots.forEach((set, r) => {
    const cells = set.map(([x, y]) => output[y][x]);
    cells.forEach((v, i) => {
      const to = (i + rot * r) % set.length;
      const [x, y] = set[to];
      output[y][x] = v;
    });
  });
  return output;
};
