import convert from "@hvm/convert";
import boolsToStr from "./boolsToStr";

const b64Toutf8 = convert("b64", "utf8");

import chunk from "./chunk";
import boolToChar from "./boolToChar";

export default str => {
  const chars = b64Toutf8(str).split("");
  return chars.reduce((a, char, i) => {
    const byte = char.charCodeAt(0);
    for (let j = 0; j < 8; j++) {
      a[i * 8 + (7 - j)] = Boolean((byte >> j) & 1);
    }
    return a;
  }, Array(chars.length * 8).fill(false));
};
