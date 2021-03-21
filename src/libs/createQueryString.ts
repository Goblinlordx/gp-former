export default (obj: Record<string, string | number | boolean>) =>
  Object.entries(obj)
    .reduce((a, [k, v]) => {
      a.append(encodeURIComponent(k), encodeURIComponent(v));
      return a;
    }, new URLSearchParams())
    .toString();
