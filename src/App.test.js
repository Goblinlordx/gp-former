import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

test("renders GP Former (title)", () => {
  const { getByText } = render(<App />);
  const title = getByText(/GP Former/i);
  expect(title).toBeInTheDocument();
});
