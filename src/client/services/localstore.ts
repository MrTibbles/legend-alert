import * as localforage from "localforage";

// Application configuration for offline storage
const config = (): void => {
  // players store
  localforage.config({
    description: "Apex Legends player stats tracker",
    name: "legend-alert",
    storeName: "players"
  });
};

// Store an item
function setOfflineActivePlayer<T>(key: string, value: T): Promise<T | void> {
  return localforage.setItem(key, value).catch(console.warn);
}

// Get the active player from offline storage
async function getOfflineActivePlayer<T>(): Promise<T | undefined> {
  try {
    const offlineItems = await localforage.length();

    if (offlineItems) {
      const activePlayer = await localforage.iterate(
        ({ isActive } : { isActive :  boolean }, key : string) => {
        if (isActive) return localforage.getItem(key);
      });

      return activePlayer ? (activePlayer as T) : undefined;
    }

    return undefined;
  } catch (error) {
    throw new Error(error);
  }
}

export { config, setOfflineActivePlayer, getOfflineActivePlayer };
export default config;
