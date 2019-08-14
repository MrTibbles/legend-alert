import localforage from "localforage";

/**
 * Application configuration for offline storage
 *
 * @return {Function} localforage config
 */
const config = () => {
  // players store
  localforage.config({
    description: "Apex Legends player stats tracker",
    name: "legend-alert",
    storeName: "players"
  });
};

/**
 * Store an item
 *
 * @param  {String}  key   Entry key for item to be stored
 * @param  {Any}     value Entry value to be stored
 * @return {Promise}       Resolves with item being stored, rejects on error encountered
 */
const setItem = (key, value) => {
  return localforage.setItem(key, value).catch(console.warn);
};

/**
 * Get the active player from offline storage
 */
const getOfflineActivePlayer = async () => {
  try {
    const offlineItems = await localforage.length();

    if (offlineItems) {
      const activePlayer = await localforage.iterate(({ isActive }, key) => {
        if (isActive) return localforage.getItem(key);
      });

      return activePlayer;
    }

    return undefined;
  } catch (error) {
    throw new Error(error);
  }
};

export { config, setItem, getOfflineActivePlayer };
export default config;
