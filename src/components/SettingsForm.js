import React from "react";
import styled from "styled-components";
import { Section } from "./Common";

const handleSubmit = (submit = () => {}) => e => {
  e.preventDefault();
  const data = new FormData(e.target);
  return submit(Object.fromEntries(data.entries()));
};

const FieldLabel = styled.span`
  margin-right: 1em;
  font-weight: bold;
`;

export default ({ data, loading, onInput, onSubmit }) => {
  const handleChange = name => e => {
    e.preventDefault();
    const v = e.target.value;
    return onInput({ ...data, [name]: v });
  };

  const handleRandomize = e => {
    const randomSeed = Math.floor(Math.random() * 36 ** 5).toString(36);
    handleChange("seed")({
      target: { value: randomSeed },
      preventDefault: e.preventDefault.bind(e)
    });
    onSubmit(e);
  };

  return (
    <Section>
      <form style={{ margin: "0.5em" }} onSubmit={handleSubmit(onSubmit)}>
        <label>
          <FieldLabel>Seed</FieldLabel>
          <input
            type="text"
            name="seed"
            disabled={loading}
            value={data.seed}
            onChange={handleChange("seed")}
          />
        </label>
        <input type="submit" label="Generate" />
        <button onClick={handleRandomize}>Randomize</button>
      </form>
    </Section>
  );
};
