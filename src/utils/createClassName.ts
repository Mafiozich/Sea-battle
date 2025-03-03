export function createClassName(...arr: (string | boolean)[]) {
  return arr.filter(Boolean).join(" ");
}