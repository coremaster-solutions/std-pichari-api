export const randomPrefixGenerator = () => {
  return Date.now() + "-" + Math.round(Math.random() * 1e9);
};
