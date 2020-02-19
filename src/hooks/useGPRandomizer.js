import { useState, useEffect } from "react";
import {
  useQueryParam,
  StringParam,
  NumberParam,
  BooleanParam
} from "use-query-params";
import generate from "../libs/gaiaProject/generate";

let internalLoading = false;
export default () => {
  const [loading, setExternalLoading] = useState(true);
  const [error, setError] = useState(null);
  const [state, setState] = useState(null);
  const setLoading = v => {
    internalLoading = v;
    setExternalLoading(v);
  };

  const [seed] = useQueryParam("s", StringParam);
  const [playerCount] = useQueryParam("p", NumberParam);
  const [debug] = useQueryParam("d", BooleanParam);

  useEffect(() => {
    if (internalLoading) return;
    setLoading(true);
    if (debug) console.time("randomizer");
    generate({
      seed: seed || "0",
      playerCount: playerCount || 4,
      debug
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
