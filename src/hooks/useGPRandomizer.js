import { useState, useEffect } from "react";
import useQuery from "../hooks/useQuery";
import generate from "../libs/gaiaProject/generate";

const parseBool = (str) => str === "true";

let internalLoading = false;
export default () => {
  const [loading, setExternalLoading] = useState(true);
  const [error, setError] = useState(null);
  const [state, setState] = useState(null);
  const setLoading = (v) => {
    internalLoading = v;
    setExternalLoading(v);
  };

  const { seed, playerCount, debug: debugQuery } = useQuery();
  const debug = parseBool(debugQuery);

  useEffect(() => {
    if (internalLoading) return;
    setLoading(true);
    new Promise((r) => setTimeout(r))
      .then(() => {
        if (debug) console.time("randomizer");
        return generate({
          seed: seed || "0",
          playerCount: parseInt(playerCount) || 4,
          mapValidators: [0, 1],
          debug: parseBool(debug),
          timeout: 5000,
        });
      })
      .then((res) => {
        setState(res);
        // Wait for render
      })
      .catch((err) => console.error(err) || setError(err))
      .finally(() => {
        if (debug) console.timeEnd("randomizer");
        setLoading(false);
      });
  }, [seed, playerCount, debug]);

  return [state, loading, error];
};
