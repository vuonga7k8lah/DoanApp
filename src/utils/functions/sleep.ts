function sleep(ms: number) {
  return new Promise(resolve => {
    const timeout = setTimeout(() => {
      resolve(undefined);
      clearTimeout(timeout);
    }, ms);
    return timeout;
  });
}
export default sleep;
