import React from "react";
import styled from "styled-components";
import tokens from "../styles/tokens";
import { Section, Content } from "./Common";
import AdvancedTechTile from "./AdvancedTechTile";
import StandardTechTile from "./StandardTechTile";
import FinalScoringTile from "./FinalScoringTile";
import RoundBooster from "./RoundBooster";
import FactionDisplay from "./FactionDisplay";

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

export default ({ setup }) => {
  const {
    bonusFederationToken,
    advancedTechTiles,
    techTiles,
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
          {tokens.researchTrackColors.map((c, i) => (
            <Cell key={c} color={c}>
              <div>fb {i === 0 && bonusFederationToken}</div>
              <AdvancedTechTile tileID={advancedTechTiles[i]} />
              <StandardTechTile tileID={techTiles[i]} />
            </Cell>
          ))}
        </GroupContent>
        <GroupContent>
          {techTiles.slice(-3).map(tileID => (
            <Cell key={tileID}>
              <StandardTechTile tileID={tileID} />
            </Cell>
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
          {finalScoringTiles.map(tileID => (
            <Cell key={tileID}>
              <FinalScoringTile tileID={tileID} />
            </Cell>
          ))}
        </GroupContent>
      </Group>
      <Group>
        <GroupHeader>Round Boosters</GroupHeader>
        <GroupContent>
          {roundBoosters.map(tileID => (
            <Cell key={tileID}>
              <RoundBooster tileID={tileID} />
            </Cell>
          ))}
        </GroupContent>
      </Group>
      <Group>
        <GroupHeader>Player Races</GroupHeader>
        <GroupContent>
          {playerRaces.map(r => (
            <Cell key={r}>
              <FactionDisplay type={r} />
            </Cell>
          ))}
        </GroupContent>
      </Group>
    </Section>
  );
};
