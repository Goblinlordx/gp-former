// Slightly modified java based hash (XOR with max after each iteration)
const hash = (value: string | number = 0) => {
  const str =
    typeof value === "number"
      ? "number:" + value.toString(36)
      : typeof value === "string"
      ? "string:" + value
      : null;

  if (str === null) {
    console.log(str, typeof str);
    throw new Error("Invalid input value (should be string or number)");
  }

  return str.split("").reduce((a, chr) => {
    a = (a << 5) - a + chr.charCodeAt(0);
    a = (a & a) + (a >>> 31);
    a = a & 0x7fffffff;
    a = a ^ 0x7fffffff;
    return a;
  }, 0);
};

export default hash;
