import React from "react";
import { render, waitForElement } from "@testing-library/react";
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

test("renders GP Former (title)", async () => {
  const { getByText } = render(<App />);
  const title = await waitForElement(() => getByText(/GP Former/i));
  expect(title).toBeInTheDocument();
});
