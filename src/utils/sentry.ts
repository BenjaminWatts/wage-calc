export const initSentry = () => {};

export default initSentry;

export const captureException = (e: Error) => {
  console.error(e);
};
