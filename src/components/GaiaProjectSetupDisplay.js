import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import tokens from "../styles/tokens";
import { Section, Content } from "./Common";
import FederationToken from "./FederationToken";
import AdvancedTechTile from "./AdvancedTechTile";
import StandardTechTile from "./StandardTechTile";
import RoundScoringTile from "./RoundScoringTile";
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

const GaiaProjectRandomizer = ({ setup }) => {
  const {
    bonusFederationToken,
    advancedTechTiles,
    techTiles,
    roundScoringTiles,
    finalScoringTiles,
    roundBoosters,
    playerFactions
  } = setup;
  return (
    <Section>
      <Group>
        <GroupHeader>Player Races</GroupHeader>
        <GroupContent>
          {playerFactions.map(r => (
            <Cell key={r}>
              <FactionDisplay type={r} />
            </Cell>
          ))}
        </GroupContent>
      </Group>
      <Group>
        <GroupHeader>Research Tracks</GroupHeader>
        <GroupContent>
          {tokens.researchTrackColors.map((c, i) => (
            <Cell key={c} color={c}>
              <FederationToken
                tokenID={i === 0 ? bonusFederationToken : null}
              />
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
          {roundScoringTiles.map(tileID => (
            <Cell key={tileID}>
              <RoundScoringTile tileID={tileID} />
            </Cell>
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
    </Section>
  );
};

export default withRouter(GaiaProjectRandomizer);
