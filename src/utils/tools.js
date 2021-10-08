/**
 * Delay
 * @param {Promise} callback
 * @param {number} ms
 * @returns
 */
export const delay = (callback, ms) =>
  new Promise((resolve) => {
    setTimeout(async () => {
      resolve(await callback());
    }, ms);
  });
