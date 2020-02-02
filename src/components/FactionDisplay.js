import React from "react";
import styled from "styled-components";
import planetType1 from "../owned/planet_type_1.png";
import planetType2 from "../owned/planet_type_2.png";
import planetType3 from "../owned/planet_type_3.png";
import planetType4 from "../owned/planet_type_4.png";
import planetType5 from "../owned/planet_type_5.png";
import planetType6 from "../owned/planet_type_6.png";
import planetType7 from "../owned/planet_type_7.png";
import style from "../styles/tokens";

const typeMap = {
  "1a": ["Terrans", style.planetTypeBackgroundColors[1], planetType1],
  "1b": ["Lantids", style.planetTypeBackgroundColors[1], planetType1],
  "2a": ["Hadsch Hallas", style.planetTypeBackgroundColors[2], planetType2],
  "2b": ["Ivits", style.planetTypeBackgroundColors[2], planetType2],
  "3a": ["Geodens", style.planetTypeBackgroundColors[3], planetType3],
  "3b": ["Bal T'aks", style.planetTypeBackgroundColors[3], planetType3],
  "4a": ["Xenos", style.planetTypeBackgroundColors[4], planetType4],
  "4b": ["Gleens", style.planetTypeBackgroundColors[4], planetType4],
  "5a": ["Taklons", style.planetTypeBackgroundColors[5], planetType5],
  "5b": ["Ambas", style.planetTypeBackgroundColors[5], planetType5],
  "6a": ["Firaks", style.planetTypeBackgroundColors[6], planetType6],
  "6b": ["Bescods", style.planetTypeBackgroundColors[6], planetType6],
  "7a": ["Nevlas", style.planetTypeBackgroundColors[7], planetType7],
  "7b": ["Itars", style.planetTypeBackgroundColors[7], planetType7]
};

const Container = styled.div`
  position: relative;
`;

const Label = styled.span`
  position: relative;
  margin-right: 0.5em;
  vertical-align: middle;
`;

const Planet = styled.img`
  position: relative;
  height: 38px;
  vertical-align: middle;
  z-index: 2;
`;

const Flourish = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: 0.5em;
  width: 100%;
  border-radius: 2px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  ${({ color }) => `background-color: ${color};`}
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

export default ({ type }) => {
  const [name, color, img] = typeMap[type] || typeMap["1a"];
  return (
    <Container>
      <Label>{name}</Label>
      <Planet src={img} alt="planet" />
      <Flourish color={color} />
    </Container>
  );
};
