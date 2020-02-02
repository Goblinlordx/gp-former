import React from "react";
import { Section } from "./Common";

const handleSubmit = (submit = () => {}) => e => {
  e.preventDefault();
  const data = new FormData(e.target);
  return submit(Object.fromEntries(data.entries()));
};

export default ({ data, loading, onInput, onSubmit }) => {
  const handleChange = name => e => {
    e.preventDefault();
    const v = e.target.value;
    return onInput({ ...data, [name]: v });
  };
  return (
    <Section>
      <form style={{ margin: "0.5em" }} onSubmit={handleSubmit(onSubmit)}>
        <label>
          Seed
          <input
            type="text"
            name="seed"
            disabled={loading}
            value={data.seed}
            onChange={handleChange("seed")}
          />
        </label>
        <input type="submit" label="Generate" />
      </form>
    </Section>
  );
};
