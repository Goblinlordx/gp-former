// Based on https://www.redblobgames.com/grids/hexagons/

export type Tile<T> = T[][];

type OddRCoord = [x: number, y: number];

export type OddQCoord = [x: number, y: number];

type CubedCoord = {
  x: number;
  y: number;
  z: number;
};

enum OddROffsetDirection {
  right = 0,
  upright,
  upleft,
  left,
  downleft,
  downright,
}

enum OddQOffsetDirection {
  downright = 0,
  upright,
  up,
  upleft,
  downleft,
  down,
}

const oddrDirections = [
  [
    [+1, 0],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, +1],
    [0, +1],
  ],
  [
    [+1, 0],
    [+1, -1],
    [0, -1],
    [-1, 0],
    [0, +1],
    [+1, +1],
  ],
];

var oddqDirections = [
  [
    [+1, 0],
    [+1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [0, +1],
  ],
  [
    [+1, +1],
    [+1, 0],
    [0, -1],
    [-1, 0],
    [-1, +1],
    [0, +1],
  ],
];

export const oddrOffsetNeighbor = (
  coord: OddRCoord,
  direction: OddROffsetDirection
) => {
  const [x, y] = coord;
  const parity = y & 1;
  const dir = oddrDirections[parity][direction];
  return [x + dir[0], y + dir[1]];
};

export const oddqOffsetNeighbor = (
  coord: OddQCoord,
  direction: OddQOffsetDirection
) => {
  const [x, y] = coord;
  const parity = x & 1;
  const dir = oddqDirections[parity][direction];
  return [x + dir[0], y + dir[1]];
};

export const cubeDistance = (a: CubedCoord, b: CubedCoord) => {
  return (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z)) / 2;
};

export const oddqToCube = (input: OddQCoord) => {
  const [inx, iny] = input;
  const x = inx;
  const z = iny - (inx - (inx & 1)) / 2;
  const y = -x - z;
  return { x, y, z };
};

export const offsetDistance = (a: OddQCoord, b: OddQCoord) =>
  cubeDistance(oddqToCube(a), oddqToCube(b));

const rots = [
  [],
  [
    [2, 1],
    [3, 1],
    [3, 2],
    [2, 3],
    [1, 2],
    [1, 1],
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
    [1, 0],
  ],
];

export const cloneTile = function <T>(tile: Tile<T>) {
  const clone: Tile<T> = tile.map((row) => row.slice());
  return clone;
};

export const rotTile = function <T>(tile: Tile<T>, rot: number) {
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
