import RNG from "../../types/RNG";

// Park-Miller LCG (ref: http://www.firstpr.com.au/dsp/rand31/)
const A = 16807; // Multiplier
const MAX = 0x7fffffff; // (2^31) - 1

const createPrng = (seed: number = 0): RNG => {
  let current = seed % MAX;
  if (current <= 0) current += MAX - 1;

  const generate = () => {
    current = (current * A) % MAX;
    return (current - 1) / MAX; // Always output float
  };

  let i = 0;
  let itr = 0;
  // Prerun (5x then (0-100)x)
  for (i = 0, itr = 5; i < itr; i++) generate();
  for (i = 0, itr = current % 100; i < itr; i++) generate();
  return generate;
};

export default createPrng;
