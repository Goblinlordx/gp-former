import boolToChar from "./boolToChar";

it("throws if there is no param passed", () => {
  let err;
  try {
    boolToChar();
  } catch (e) {
    err = e;
  }
  expect(err).toBeTruthy();
});

it("throws if input is too large", () => {
  let err;
  try {
    boolToChar(Array(9).fill(false));
  } catch (e) {
    err = e;
  }
  expect(err).toBeTruthy();
});

it("outputs proper result for empty array", () => {
  const res = boolToChar([]);
  expect(res).toEqual(String.fromCharCode(0));
});

it("outputs proper result for empty half filled array", () => {
  const res = boolToChar(Array(4).fill(true));
  expect(res).toEqual(String.fromCharCode(0xf0));
});

it("outputs proper result for empty half filled array", () => {
  const res = boolToChar(Array(8).fill(true));
  expect(res).toEqual(String.fromCharCode(0xff));
});
