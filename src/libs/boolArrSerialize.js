import convert from "@hvm/convert";
import boolsToStr from "./boolsToStr";

const utf8ToB64 = convert("utf8", "b64");

export default bools => utf8ToB64(boolsToStr(bools));
