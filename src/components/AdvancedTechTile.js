import React from "react";
import adv01 from "../owned/adv_01.png";
import adv02 from "../owned/adv_02.png";
import adv03 from "../owned/adv_03.png";
import adv04 from "../owned/adv_04.png";
import adv05 from "../owned/adv_05.png";
import adv06 from "../owned/adv_06.png";
import adv07 from "../owned/adv_07.png";
import adv08 from "../owned/adv_08.png";
import adv09 from "../owned/adv_09.png";
import adv10 from "../owned/adv_10.png";
import adv11 from "../owned/adv_11.png";
import adv12 from "../owned/adv_12.png";
import adv13 from "../owned/adv_13.png";
import adv14 from "../owned/adv_14.png";
import adv15 from "../owned/adv_15.png";
import { Tile } from "./Common";

const tiles = {
  adv01,
  adv02,
  adv03,
  adv04,
  adv05,
  adv06,
  adv07,
  adv08,
  adv09,
  adv10,
  adv11,
  adv12,
  adv13,
  adv14,
  adv15
};

const idToName = n => `adv${("00" + n).slice(-2)}`;

export default ({ tileID }) => (
  <Tile src={tiles[idToName(tileID)]} alt="advanced research tile" />
);
