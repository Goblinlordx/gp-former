import { useState, useEffect } from "react";
import useQuery from "../hooks/useQuery";
import randomizeGaiaProject from "../libs/randomizeGaiaProject";

const parseBool = str => str === "true";

let internalLoading = false;
export default () => {
  const [loading, setExternalLoading] = useState(true);
  const [error, setError] = useState(null);
  const [state, setState] = useState(null);
  const setLoading = v => {
    internalLoading = v;
    setExternalLoading(v);
  };

  const { seed, playerCount, debug } = useQuery();

  useEffect(() => {
    if (internalLoading) return;
    setLoading(true);
    if (debug) console.time("randomizer");
    randomizeGaiaProject({
      seed,
      playerCount: parseInt(playerCount) || 4,
      debug: parseBool(debug)
    })
      .then(res => {
        setState(res);
      })
      .catch(err => setError(err))
      .finally(() => {
        if (debug) console.timeEnd("randomizer");
        setLoading(false);
      });
  }, [seed, playerCount, debug]);

  return [state, loading, error];
};
