import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        margin: "2em 1em 1em 1em",
        textAlign: "center",
        fontSize: "0.5em",
      }}
    >
      <a
        style={{ textDecoration: "none", color: "black" }}
        href="https://github.com/Goblinlordx/gp-former/blob/master/LICENSE.md"
      >
        <small>
          Graphics from Gaia Prject &copy; Copyright 2017, Feuerland
          Verlagsgesellschaft mbH
        </small>
        <br />
        <small>
          &copy; Copyright 2020, Benjamin Baldivia under the GNU AGPLv3
        </small>
      </a>
    </footer>
  );
}
