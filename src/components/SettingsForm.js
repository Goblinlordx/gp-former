import React, { useState } from "react";
import {
  withQueryParams,
  NumberParam,
  StringParam,
  BooleanParam
} from "use-query-params";
import styled from "styled-components";
import { Section } from "./Common";

const Form = styled.form`
  font-size: 18px;
  input,
  select,
  button {
    font-size: 18px;
  }
  input,
  select {
    padding: 0.25em 0.5em;
    border: none;
    border-radius: 4px;
  }
  button {
    border-radius: 4px;
    font-weight: bold;
    margin-top: 1em;
    padding: 0.25em 1em;
    & + button {
      margin-left: 1em;
    }
  }
`;

const ButtonRow = styled.div`
  text-align: right;
`;

const Field = styled.label`
  display: flex;
  max-width: 300px;
  margin-bottom: 0.25em;
  input,
  select {
    flex-grow: 1;
  }
`;

const FieldLabel = styled.span`
  margin-right: 1em;
  font-weight: bold;
`;

const SettingsForm = ({ loading, query, setQuery }) => {
  const { s, p = 4 } = query;
  const [form, setForm] = useState({
    ...query,
    s: s || "0",
    p: p || 4
  });

  const handleSubmit = e => {
    e.preventDefault();
    setQuery({ d: query.d, ...form });
  };
  const handleChange = name => e => {
    e.preventDefault();
    const v = e.target.value;
    return setForm({ ...form, [name]: v });
  };

  const handleRandomize = e => {
    const s = Math.floor(Math.random() * 36 ** 5).toString(36);
    const next = { ...form, s };
    setForm(next);
    setQuery({ ...query, ...next });
  };

  return (
    <Section>
      <Form style={{ margin: "0.5em" }} onSubmit={handleSubmit}>
        <div>
          <Field>
            <FieldLabel>Seed</FieldLabel>
            <input
              type="text"
              name="s"
              value={form.s}
              onChange={handleChange("s")}
            />
          </Field>
        </div>
        <div>
          <Field>
            <FieldLabel>Player Count</FieldLabel>
            <select name="p" value={form.p} onChange={handleChange("p")}>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </Field>
        </div>
        <ButtonRow>
          <button hidden disabled={loading} onClick={handleSubmit} />
          <button disabled={loading} onClick={handleRandomize}>
            Randomize
          </button>
          <button disabled={loading} onClick={handleSubmit}>
            Generate
          </button>
        </ButtonRow>
      </Form>
    </Section>
  );
};

export default withQueryParams(
  {
    s: StringParam,
    p: NumberParam,
    d: BooleanParam
  },
  SettingsForm
);
