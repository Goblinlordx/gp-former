import React from "react";
import styled from "styled-components";
import fin1 from "../owned/fin_1.png";
import fin2 from "../owned/fin_2.png";
import fin3 from "../owned/fin_3.png";
import fin4 from "../owned/fin_4.png";
import fin5 from "../owned/fin_5.png";
import fin6 from "../owned/fin_6.png";
import { Tile } from "./Common";

const tiles = {
  fin1,
  fin2,
  fin3,
  fin4,
  fin5,
  fin6
};

const FinalScoringTile = styled(Tile)`
  width: calc((100vw - 5em) / 4);
`;

export default ({ tileID }) => (
  <FinalScoringTile src={tiles[`fin${tileID}`]} alt="Final scoring tile" />
);
