import React from "react";
import GaiaProjectSetupDisplay from "./GaiaProjectSetupDisplay";

export default ({ setup, loading, error }) => {
  return (
    <div>
      {/* {loading ? (
        <div>Loading</div>
      ) : (
        error && <div>Error during generation</div>
      )} */}
      {setup ? (
        <GaiaProjectSetupDisplay
          style={{ opacity: loading ? 0.5 : 1, transition: "opacity 0.2s ease" }}
          setup={setup}
        />
      ) : (
        <div />
      )}
    </div>
  );
};
