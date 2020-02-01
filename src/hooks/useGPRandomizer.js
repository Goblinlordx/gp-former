import { useState, useEffect } from "react";
import randomizeGaiaProject from "../libs/randomizeGaiaProject";

let internalLoading = false;
export default config => {
  const [loading, setExternalLoading] = useState(true);
  const [inputConfig, setInputConfig] = useState(config);
  const [error, setError] = useState(null);
  const [state, setState] = useState(null);
  const setLoading = v => {
    internalLoading = v;
    setExternalLoading(v);
  };

  const run = () => {
    setInputConfig(config);
  };

  const reset = () => {
    setState(null);
    setError(null);
  };

  useEffect(() => {
    if (internalLoading) return;
    setLoading(true);
    const { debug = false } = inputConfig;
    if (debug) console.time("randomizer");
    randomizeGaiaProject(inputConfig)
      .then(res => {
        setState(res);
      })
      .catch(err => console.log(err) || setError(err))
      .finally(() => {
        if (debug) console.timeEnd("randomizer");
        setLoading(false);
      });
  }, [inputConfig]);

  return [state, run, reset, loading, error];
};
