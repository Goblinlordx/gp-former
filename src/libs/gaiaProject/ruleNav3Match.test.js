import ruleNav3Match from "./ruleNav3Match";

it("test", () => {
  const layout = [
    [
      [0, 0],
      [1, 1],
      [2, 5],
      [0, 0]
    ],
    [
      [0, 0],
      ["7b", 5],
      [0, 0],
      [0, 0]
    ]
  ];
  ruleNav3Match(layout);
});
