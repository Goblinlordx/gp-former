import React from "react";
import styled from "styled-components";
import tec1 from "../owned/tec_1.png";
import tec2 from "../owned/tec_2.png";
import tec3 from "../owned/tec_3.png";
import tec4 from "../owned/tec_4.png";
import tec5 from "../owned/tec_5.png";
import tec6 from "../owned/tec_6.png";
import tec7 from "../owned/tec_7.png";
import tec8 from "../owned/tec_8.png";
import tec9 from "../owned/tec_9.png";

const tiles = {
  tec1,
  tec2,
  tec3,
  tec4,
  tec5,
  tec6,
  tec7,
  tec8,
  tec9
};

const Tile = styled.img`
  height: 80px;
  margin: 0.25em 0em;
`;

export default ({ tileID }) => (
  <Tile src={tiles[`tec${tileID}`]} alt="standard tech tile" />
);