import { useLocation } from "react-router-dom";

const useQuery = () => {
  const params = new URLSearchParams(useLocation().search).entries();
  const output = {};
  for (const pair of params) {
    output[pair[0]] = pair[1];
  }
  return output;
};

export default useQuery;
