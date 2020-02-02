import React from "react";
import styled from "styled-components";
import rs1 from "../owned/rs_1.png";
import rs2 from "../owned/rs_2.png";
import rs3 from "../owned/rs_3.png";
import rs4 from "../owned/rs_4.png";
import rs5 from "../owned/rs_5.png";
import rs6 from "../owned/rs_6.png";
import rs7 from "../owned/rs_7.png";
import rs8 from "../owned/rs_8.png";
import rs9 from "../owned/rs_9.png";

const tiles = {
  rs1,
  rs2,
  rs3,
  rs4,
  rs5,
  rs6,
  rs7,
  rs8,
  rs9,
  rs10: rs9
};

const Tile = styled.img`
  width: 130px;
`;

export default ({ tileID }) => (
  <Tile src={tiles[`rs${tileID}`]} alt="round scoring tile" />
);
