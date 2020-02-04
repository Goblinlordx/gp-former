import Types from "./hexTypes";
const { empty, space, p1, p2, p3, p4, p5, p6, p7, p8, p9 } = Types;

// Map tiles in OddQ orientation
const mapTiles = {
  1: [
    [empty, space, space, space, empty],
    [space, p5, space, p1, space],
    [p4, space, space, space, p9],
    [space, space, space, p3, space],
    [empty, empty, space, empty, empty]
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
  "5a": [
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
  "6a": [
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
  "7a": [
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

export default mapTiles;
