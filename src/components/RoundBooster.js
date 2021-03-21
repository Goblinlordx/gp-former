import React from "react";
import styled from "styled-components";
import rb01 from "../owned/rb_01.png";
import rb02 from "../owned/rb_02.png";
import rb03 from "../owned/rb_03.png";
import rb04 from "../owned/rb_04.png";
import rb05 from "../owned/rb_05.png";
import rb06 from "../owned/rb_06.png";
import rb07 from "../owned/rb_07.png";
import rb08 from "../owned/rb_08.png";
import rb09 from "../owned/rb_09.png";
import rb10 from "../owned/rb_10.png";

const tiles = {
  rb01,
  rb02,
  rb03,
  rb04,
  rb05,
  rb06,
  rb07,
  rb08,
  rb09,
  rb10,
};

const idToName = (n) => `rb${("00" + n).slice(-2)}`;

const Booster = styled.img`
  width: 100px;
`;

export default ({ tileID }) => (
  <Booster src={tiles[idToName(tileID)]} alt="round booster" />
);
