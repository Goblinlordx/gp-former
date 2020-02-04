export default str => {
  const chars = atob(str).split("");
  return chars.reduce((a, char, i) => {
    const byte = char.charCodeAt(0);
    for (let j = 0; j < 8; j++) {
      a[i * 8 + (7 - j)] = Boolean((byte >> j) & 1);
    }
    return a;
  }, Array(chars.length * 8).fill(false));
};
