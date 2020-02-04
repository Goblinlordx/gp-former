export default (arr, size) =>
  arr.reduce((a, v, i) => {
    if (i % size === 0) a.push([]);
    a[Math.floor(i / size)].push(v);
    return a;
  }, []);
