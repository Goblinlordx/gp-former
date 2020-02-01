import React from "react";
import { Section, Content } from "./Common";
import styled from "styled-components";

const Group = styled(Content)`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  border-radius: 4px;
  background-color: #ccc;
  color: #222;
`;

const GroupHeader = styled(Content)`
  font-weight: bold;
`;

const GroupContent = styled.div`
  display: flex;
  position: relative;
  overflow: auto;
`;

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  ${({ color }) => color && `background-color: ${color};`}
  padding: 0.5em;
`;

const researchColors = [
  "#7b4f40",
  "#6c84a3",
  "#53a236",
  "#a81974",
  "#f0a108",
  "#1b9bcc"
];

export default ({ setup }) => {
  const {
    bonusFederationTile,
    advancedResearchTiles,
    researchTiles,
    roundBonusTiles,
    finalScoringTiles,
    roundBoosters,
    playerRaces
  } = setup;
  return (
    <Section>
      <Group>
        <GroupHeader>Research Tracks</GroupHeader>
        <GroupContent>
          {researchColors.map((c, i) => (
            <Cell key={c} color={c}>
              <div>fb {i === 0 && bonusFederationTile}</div>
              <div>adv {advancedResearchTiles[i]}</div>
              <div>res {researchTiles[i]}</div>
            </Cell>
          ))}
        </GroupContent>
        <GroupContent>
          {researchTiles.slice(6).map(i => (
            <Cell key={i}>res {researchTiles[i]}</Cell>
          ))}
        </GroupContent>
      </Group>
      <Group>
        <GroupHeader>Round Track & Final Scoring</GroupHeader>
        <GroupContent>
          {roundBonusTiles.map(i => (
            <Cell key={i}>rb {i}</Cell>
          ))}
        </GroupContent>
        <GroupContent>
          {finalScoringTiles.map(i => (
            <Cell key={i}>fs {i}</Cell>
          ))}
        </GroupContent>
      </Group>
      <Group>
        <GroupHeader>Round Boosters</GroupHeader>
        <GroupContent>
          {roundBoosters.map(i => (
            <Cell key={i}>boost {i}</Cell>
          ))}
        </GroupContent>
      </Group>
      <Group>
        <GroupHeader>Player Races</GroupHeader>
        <GroupContent>
          {playerRaces.map(r => (
            <Cell key={r}>race {r}</Cell>
          ))}
        </GroupContent>
      </Group>
    </Section>
  );
};