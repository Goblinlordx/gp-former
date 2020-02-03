import React from "react";
import styled from "styled-components";
import tokens from "../styles/tokens";
import FederationToken from "./FederationToken";
import AdvancedTechTile from "./AdvancedTechTile";
import StandardTechTile from "./StandardTechTile";
import { GroupContent, Cell } from "./Common";

const ResearchCell = styled(Cell)`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: calc(100% / 7 - 16px);
  @media (max-width: ${tokens.breakpoints.lg}) {
    width: calc(100% / 4 - 16px);
  }
  @media (max-width: ${tokens.breakpoints.lg}) {
    width: calc(100% / 3 - 16px);
  }
`;

const ExcessResearchCell = styled(ResearchCell)`
  @media (max-width: ${tokens.breakpoints.lg}) {
    flex-direction: row;
    img {
      max-width: 25%;
    }
  }
`;

export default ({ federationToken, advancedTechTiles, standardTechTiles }) => (
  <GroupContent>
    {tokens.researchTrackColors.map((c, i) => (
      <ResearchCell color={c} key={i}>
        <FederationToken tokenID={i === 0 ? federationToken : null} />
        <AdvancedTechTile tileID={advancedTechTiles[i]} />
        <StandardTechTile tileID={standardTechTiles[i]} />
      </ResearchCell>
    ))}
    <ExcessResearchCell>
      {standardTechTiles.slice(6).map(tileID => (
        <StandardTechTile tileID={tileID} />
      ))}
    </ExcessResearchCell>
  </GroupContent>
);
