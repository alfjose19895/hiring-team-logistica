export const createUniqueId = (): string =>
  (
    performance.now().toString(32) +
    Math.random().toString(32).substring(2) +
    Date.now().toString(32)
  ).replace('.', '');
