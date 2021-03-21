const hexTypes = [
  "empty",
  "p1",
  "p2",
  "p3",
  "p4",
  "p5",
  "p6",
  "p7",
  "p8",
  "p9",
  "space",
].reduce((a, k, v) => {
  a[k] = v;
  return a;
}, {});

export default hexTypes;
