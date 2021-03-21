import boolsToStr from "./boolsToStr";

export default (bools: boolean[]) => btoa(boolsToStr(bools));
