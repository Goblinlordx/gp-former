const SIZE = 8;
export default boolArr => {
  if (!boolArr) throw new Error("Invalid array");
  if (boolArr.length > SIZE)
    throw new Error(`Invalid array size: ${boolArr.length}`);
  const filledArr = boolArr.reduce((a, bit, i) => {
    a[i] = bit;
    return a;
  }, Array(SIZE).fill(false));
  return String.fromCharCode(
    filledArr.reduce((a, bit) => (a << 1) | (bit ? 1 : 0), 0)
  );
};
