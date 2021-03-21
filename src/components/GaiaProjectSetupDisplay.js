import React from "react";
import { withRouter } from "react-router-dom";
import { Section, Group, GroupHeader, GroupContent, Cell } from "./Common";
import ResearchTrack from "./ResearchTrack";
import RoundScoringTile from "./RoundScoringTile";
import FinalScoringTile from "./FinalScoringTile";
import RoundBooster from "./RoundBooster";
import FactionDisplay from "./FactionDisplay";

const _GaiaProjectRandomizer = ({ setup, ...props }) => {
  const {
    bonusFederationToken,
    advancedTechTiles,
    techTiles,
    roundScoringTiles,
    finalScoringTiles,
    roundBoosters,
    playerFactions,
  } = setup;
  return (
    <Section {...props}>
      <Group>
        <GroupHeader>Player Factions</GroupHeader>
        <GroupContent>
          {playerFactions.map((r) => (
            <Cell key={r}>
              <FactionDisplay type={r} />
            </Cell>
          ))}
        </GroupContent>
      </Group>
      <Group>
        <GroupHeader>Research Tracks</GroupHeader>
        <ResearchTrack
          federationToken={bonusFederationToken}
          advancedTechTiles={advancedTechTiles}
          standardTechTiles={techTiles}
        />
      </Group>
      <Group>
        <GroupHeader>Round Track & Final Scoring</GroupHeader>
        <GroupContent>
          {roundScoringTiles.map((tileID) => (
            <Cell key={tileID}>
              <RoundScoringTile tileID={tileID} />
            </Cell>
          ))}
        </GroupContent>
        <GroupContent>
          {finalScoringTiles.map((tileID) => (
            <Cell key={tileID}>
              <FinalScoringTile tileID={tileID} />
            </Cell>
          ))}
        </GroupContent>
      </Group>
      <Group>
        <GroupHeader>Round Boosters</GroupHeader>
        <GroupContent>
          {roundBoosters.map((tileID) => (
            <Cell key={tileID}>
              <RoundBooster tileID={tileID} />
            </Cell>
          ))}
        </GroupContent>
      </Group>
    </Section>
  );
};

const GaiaProjectRandomizer = withRouter(_GaiaProjectRandomizer);
export default GaiaProjectRandomizer;
