import chunk from "./chunk";
import boolToChar from "./boolToChar";

export default arr =>
  chunk(arr, 8)
    .reduce((a, boolArr, i) => {
      a[i] = boolToChar(boolArr);
      return a;
    }, Array(Math.ceil(arr.length / 8)))
    .join("");
