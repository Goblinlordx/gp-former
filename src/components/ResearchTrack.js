import React from "react";
import tokens from "../styles/tokens";
import FederationToken from "./FederationToken";
import AdvancedTechTile from "./AdvancedTechTile";
import StandardTechTile from "./StandardTechTile";
import { Group, GroupHeader, GroupContent, Cell } from "./Common";

export default ({ federationToken, advancedTechTiles, standardTechTiles }) => (
  <Group>
    <GroupHeader>Research Tracks</GroupHeader>
    <GroupContent>
      {tokens.researchTrackColors.map((c, i) => 
        <Cell color={c} key={i}>
          <FederationToken tokenID={i === 0 ? federationToken : null} />
          <AdvancedTechTile tileID={advancedTechTiles[i]} />
          <StandardTechTile tileID={standardTechTiles[i]} />
        </Cell>
      )}
    </GroupContent>
  </Group>
);
