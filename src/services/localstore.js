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
const setItem = async (key, value) => {
  try {
    await localforage.setItem(key, value);
  } catch (err) {
    throw new Error(`Failed to store ${key}, ${err}`);
  }
};

/**
 * Retrieve all items stored in offline storage for the app
 *
 * @return {Array} Player objects, keyed by platformUserId
 */
const getAllEntries = async () => {
  try {
    const players = [];

    await localforage.iterate((value, key) => players.push({ [key]: value }));

    return players;
  } catch (err) {
    throw new Error(`Failed to get the active player: ${err}`);
  }
};

export { config, getAllEntries, setItem };
export default config;
