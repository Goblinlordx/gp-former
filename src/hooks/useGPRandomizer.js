import { useState, useEffect } from "react";
import useQuery from "../hooks/useQuery";
import generate from "../libs/gaiaProject/generate";

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

  const { seed, playerCount, debug: debugQuery } = useQuery();
  const debug = parseBool(debugQuery);

  useEffect(() => {
    if (internalLoading) return;
    setLoading(true);
    if (debug) console.time("randomizer");
    generate({
      seed: seed || "0",
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
