// obj = {a: 1, b: 2, c: 3, d: 4}
// exclude = new Set(['a', 'b'])
export function omitSetProperties(obj: object, exclude: Set<string>) {
  return Object.fromEntries(
    Object.entries(obj).filter((e) => !exclude.has(e[0]))
  );
}
