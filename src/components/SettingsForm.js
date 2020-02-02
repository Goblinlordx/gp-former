import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Section } from "./Common";
import useQuery from "../hooks/useQuery";
import createQueryString from "../libs/createQueryString";

const Form = styled.form`
  font-size: 18px;
  input,
  select,
  button {
    font-size: 18px;
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

export default ({ loading }) => {
  const query = useQuery();
  const history = useHistory();
  const [form, setForm] = useState({
    seed: 0,
    playerCount: 4,
    debug: false,
    ...query
  });
  const handleSubmit = e => {
    e.preventDefault();
    history.push({ pathname: "/", search: createQueryString(form) });
  };
  const handleChange = name => e => {
    e.preventDefault();
    const v = e.target.value;
    return setForm({ ...form, [name]: v });
  };

  const handleRandomize = e => {
    const seed = Math.floor(Math.random() * 36 ** 5).toString(36);
    const next = { ...form, seed };
    setForm(next);
    history.push({
      pathname: "/",
      search: createQueryString(next)
    });
  };

  return (
    <Section>
      <Form style={{ margin: "0.5em" }} onSubmit={handleSubmit}>
        <div>
          <Field>
            <FieldLabel>Seed</FieldLabel>
            <input
              type="text"
              name="seed"
              value={form.seed}
              onChange={handleChange("seed")}
            />
          </Field>
        </div>
        <div>
          <Field>
            <FieldLabel>Player Count</FieldLabel>
            <select
              name="playerCount"
              value={form.playerCount}
              onChange={handleChange("playerCount")}
            >
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
