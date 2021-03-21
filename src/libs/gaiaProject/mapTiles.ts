import HexType from "./HexType";
import { OddQCoord, rotTile, offsetDistance } from "../map/hex";
const { empty, space, p1, p2, p3, p4, p5, p6, p7, p8, p9 } = HexType;

type Sector = HexType[][];

export type SectorConfig = [id: string, rot: number];

// Map tiles in OddQ orientation
const mapTiles: Record<string, Sector> = {
  0: [
    [empty, empty, empty, empty, empty],
    [empty, empty, empty, empty, empty],
    [empty, empty, empty, empty, empty],
    [empty, empty, empty, empty, empty],
    [empty, empty, empty, empty, empty],
  ],
  1: [
    [empty, space, space, space, empty],
    [space, p5, space, p1, space],
    [p4, space, space, space, p9],
    [space, space, space, p3, space],
    [empty, empty, space, empty, empty],
  ],
  2: [
    [empty, p3, p6, space, empty],
    [space, space, space, p7, space],
    [space, p5, space, space, p4],
    [space, p2, space, p9, space],
    [empty, empty, space, empty, empty],
  ],
  3: [
    [empty, space, p9, space, empty],
    [space, p8, space, space, space],
    [space, space, space, p7, p6],
    [space, p1, space, space, space],
    [empty, empty, p4, empty, empty],
  ],
  4: [
    [empty, space, p6, space, empty],
    [space, space, p2, space, space],
    [p7, p3, space, p5, space],
    [space, space, space, space, p1],
    [empty, empty, space, empty, empty],
  ],
  "5f": [
    [empty, space, p7, space, empty],
    [space, p8, space, space, p9],
    [space, space, space, space, p2],
    [space, p3, space, space, space],
    [empty, empty, p4, empty, empty],
  ],
  "5b": [
    [empty, space, p7, space, empty],
    [space, p8, space, space, p9],
    [space, space, space, space, p2],
    [space, p2, space, space, space],
    [empty, empty, space, empty, empty],
  ],
  "6f": [
    [empty, space, space, p9, empty],
    [space, p5, space, p1, space],
    [space, space, space, space, space],
    [space, space, p8, space, p4],
    [empty, empty, space, empty, empty],
  ],
  "6b": [
    [empty, space, space, p9, empty],
    [space, space, space, p1, space],
    [space, space, space, space, space],
    [space, space, p8, p9, p4],
    [empty, empty, space, empty, empty],
  ],
  "7f": [
    [empty, space, space, p5, empty],
    [p9, space, p2, space, space],
    [space, p8, space, p8, space],
    [space, space, space, space, space],
    [empty, empty, p6, empty, empty],
  ],
  "7b": [
    [empty, space, space, space, empty],
    [p9, space, p8, space, space],
    [space, p8, space, p2, space],
    [space, space, space, space, space],
    [empty, empty, p6, empty, empty],
  ],
  8: [
    [empty, space, p1, space, empty],
    [space, space, p7, space, p9],
    [space, p3, space, p6, space],
    [space, p9, space, space, space],
    [empty, empty, space, empty, empty],
  ],
  9: [
    [empty, p3, space, p9, empty],
    [space, space, space, space, p7],
    [space, p6, space, p8, space],
    [p5, space, space, space, space],
    [empty, empty, space, empty, empty],
  ],
  10: [
    [empty, space, space, p9, empty],
    [space, p4, space, space, p9],
    [space, space, space, p8, space],
    [p1, p2, space, space, space],
    [empty, empty, space, empty, empty],
  ],
};

export const getWithinDist = (map: HexType[][], coord: OddQCoord, dist = 3) =>
  map
    .filter((_, y) => Math.abs(y - coord[1]) <= dist)
    .reduce<OddQCoord[]>((a, row, y) => {
      row
        .filter((_, x) => Math.abs(x - coord[0]) <= dist)
        .forEach((_, x) => {
          const tdist = offsetDistance(coord, [x, y]);
          if (tdist > 0 && tdist <= dist) a.push([x, y]);
        });
      return a;
    }, []);

export const getTile = (config: SectorConfig) => {
  const [id, rot] = config;
  const tile = mapTiles[id];
  if (!tile)
    throw new Error(
      `Invalid tile ID: ${id}\n valid IDs: ${Object.keys(mapTiles).join(", ")}`
    );
  return rotTile(tile, rot);
};

export const buildMap = (layout: SectorConfig[][], premade?: HexType[][]) => {
  const addRows = Math.max(0, layout[0].length - 1);
  const map =
    premade ||
    Array<HexType[]>(layout.length * 5 + addRows)
      .fill([])
      .map(() => Array<HexType>(layout[0].length * 5).fill(empty));
  layout.forEach((idRots, y) => {
    const tiles = idRots.map((t) => getTile(t));
    tiles.forEach((t, x) => {
      const originX = x * 5;
      const originY = y * 5 + Math.floor(x / 2);
      const shiftEven = Math.ceil(x / 2);
      const shiftOdd = Math.floor(x / 2);

      t.forEach((tRow, offsetY) => {
        tRow.forEach((hex, offsetX) => {
          const outY = originY + offsetY + (offsetX % 2 ? shiftEven : shiftOdd);
          const outX = originX + offsetX;
          try {
            map[outY][outX] = hex;
          } catch (error) {
            console.log(y, x, originY, originX, outY, outX);
            throw error;
          }
        });
      });
    });
  });
  return map;
};

export default mapTiles;