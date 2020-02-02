import React from "react";
import GaiaProjectSetupDisplay from "./GaiaProjectSetupDisplay";

export default ({setup, loading, error}) => {
  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>Error during generation</div>
  ) : (
    <GaiaProjectSetupDisplay setup={setup} />
  );
};
