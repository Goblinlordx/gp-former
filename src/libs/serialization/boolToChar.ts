const SIZE = 8;

export default (boolArr: boolean[]) => {
  if (!boolArr) throw new Error("Invalid array");
  if (boolArr.length > SIZE)
    throw new Error(`Invalid array size: ${boolArr.length}`);
  const filledArr = boolArr.reduce<boolean[]>((a, bit, i) => {
    a[i] = bit;
    return a;
  }, Array<boolean>(SIZE).fill(false));
  return String.fromCharCode(
    filledArr.reduce<number>((a, bit) => (a << 1) | (bit ? 1 : 0), 0)
  );
};
