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
  padding: 0;
  div {
    display: inline-flex;
    flex-direction: column;
    width: calc((100vw - 7em) / 6);
    align-items: center;
    justify-content: space-around;
    position: relative;
  }
`;

const ExcessResearchCell = styled(ResearchCell)`
  flex-direction: row;
  img {
    width: calc((100vw - 7em) / 6);
  }
`;

export default ({ federationToken, advancedTechTiles, standardTechTiles }) => (
  <GroupContent>
    {tokens.researchTrackColors.map((c, i) => (
      <ResearchCell color={c} key={i}>
        <div>
          <FederationToken tokenID={i === 0 ? federationToken : null} />
          <AdvancedTechTile tileID={advancedTechTiles[i]} />
          <StandardTechTile tileID={standardTechTiles[i]} />
        </div>
      </ResearchCell>
    ))}
    <ExcessResearchCell>
      {standardTechTiles.slice(6).map(tileID => (
        <StandardTechTile key={tileID} tileID={tileID} />
      ))}
    </ExcessResearchCell>
  </GroupContent>
);
