import chunk from "./chunk";
import boolToChar from "./boolToChar";

export default (arr: boolean[]) =>
  chunk(arr, 8)
    .reduce((a: string[], boolArr: boolean[], i: number) => {
      a[i] = boolToChar(boolArr);
      return a;
    }, Array(Math.ceil(arr.length / 8)))
    .join("");
