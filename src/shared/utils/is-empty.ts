export function isEmpty(o: any) {
  for (const _ in o) {
    return false;
  }
  return true;
}

export function isUndefined(o: any) {
  return typeof o === "undefined";
}
