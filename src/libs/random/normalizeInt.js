const normalizeInt = (float, max = 0x80000000, min = 0) =>
  Math.floor(float * max + min);

export default normalizeInt;
