import React from "react";
import styled from "styled-components";
import sTokens from "../styles/tokens";
import fed1 from "../owned/fed_1.png";
import fed2 from "../owned/fed_2.png";
import fed3 from "../owned/fed_3.png";
import fed4 from "../owned/fed_4.png";
import fed5 from "../owned/fed_5.png";
import fed6 from "../owned/fed_6.png";
import fed7 from "../owned/fed_7.png";

const tokens = {
  fed1,
  fed2,
  fed3,
  fed4,
  fed5,
  fed6,
  fed7
};

const Token = styled.img`
  width: 60px;
  margin: 0.25em;
  @media (max-width: ${sTokens.breakpoints.md}) {
    width: 40px;
  }
`;

export default ({ tokenID, ...props }) =>
  tokenID != null ? (
    <Token src={tokens[`fed${tokenID}`]} alt="federation token" {...props} />
  ) : null;
