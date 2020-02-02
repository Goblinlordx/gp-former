import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Section } from "./Common";
import useQuery from "../hooks/useQuery";
import createQueryString from "../libs/createQueryString";

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
      <form style={{ margin: "0.5em" }} onSubmit={handleSubmit}>
        <div>
          <label>
            <FieldLabel>Seed</FieldLabel>
            <input
              type="text"
              name="seed"
              value={form.seed}
              onChange={handleChange("seed")}
            />
          </label>
        </div>
        <div>
          <label>
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
          </label>
        </div>
        <input type="submit" label="Generate" />
        <button disabled={loading} onClick={handleRandomize}>
          Randomize
        </button>
      </form>
    </Section>
  );
};
