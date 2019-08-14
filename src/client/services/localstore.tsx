import * as localforage from "localforage";

interface IActivePlayer {
  platformSlug: string;
  platformUserId: string;
  isActive?: boolean;
}

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
 */
const setOfflineActivePlayer = (key: string, value: IActivePlayer): Promise<
  IActivePlayer | void
> => {
  return localforage.setItem(key, value).catch(console.warn);
};

/**
 * Get the active player from offline storage
 */
const getOfflineActivePlayer = async (): Promise<
  IActivePlayer | undefined
> => {
  try {
    const offlineItems = await localforage.length();

    if (offlineItems) {
      const activePlayer = await localforage.iterate(
        ({ isActive }, key) => {
          if (isActive) return localforage.getItem(key);
        }
      );

      return activePlayer as IActivePlayer;
    }

    return undefined;
  } catch (error) {
    throw new Error(error);
  }
};

export { config, setOfflineActivePlayer, getOfflineActivePlayer };
export default config;
