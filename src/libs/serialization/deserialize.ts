export default (str: string) => {
  const chars = atob(str).split("");
  return chars.reduce<boolean[]>((a, char, i) => {
    const byte = char.charCodeAt(0);
    for (let j = 0; j < 8; j++) {
      a[i * 8 + (7 - j)] = Boolean((byte >> j) & 1);
    }
    return a;
  }, Array<boolean>(chars.length * 8).fill(false));
};
