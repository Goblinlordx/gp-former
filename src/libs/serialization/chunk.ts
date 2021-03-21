export default function <T>(arr: T[], size: number) {
  return arr.reduce<T[][]>((a, v, i) => {
    if (i % size === 0) a.push([]);
    a[Math.floor(i / size)].push(v);
    return a;
  }, []);
}
