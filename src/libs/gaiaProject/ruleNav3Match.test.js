import ruleNav3Match from "./ruleNav3Match";

it("test", () => {
  const layout = [
    [
      [0, 0],
      ["7b", 5],
      [9, 5],
      [0, 0]
    ],
    [
      [0, 0],
      [10, 5],
      [0, 0],
      [0, 0]
    ]
  ];
  ruleNav3Match(layout);
});
