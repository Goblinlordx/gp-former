export default function createQueryString(
  obj: Record<string, string | number | boolean>
) {
  return Object.entries(obj)
    .reduce((a, [k, v]) => {
      a.append(encodeURIComponent(k), encodeURIComponent(v));
      return a;
    }, new URLSearchParams())
    .toString();
}
