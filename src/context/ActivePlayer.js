import React from "react";
import { localstore } from "../services";

const ActivePlayerContext = React.createContext();

const ActivePlayerProvider = props => {
  const [activePlayer, setActivePlayer] = React.useState(null);

  /**
   * Retrieve the last active player stored in offline storage
   *
   * @return {Object|undefined} Tracker Network player search result or undefined
   */
  const getActivePlayerFromLocalstore = React.useRef(async () => {
    const players = await localstore.getAllEntries();

    // players is an array of objects keyed by platformUserId, each item
    // has a Tracker Network search result object as their value
    const player = players.length
      ? players.find(player => {
          return Object.values(player).find(({ isActive }) => isActive);
        })
      : undefined;

    // Return the Tracker Network search result object
    return player ? Object.values(player)[0] : undefined;
  });

  /**
   * Set the active player
   *
   * @param  {Object}  player Tracker Network player search response object
   * @return {Promise}        Resolves with item being stored, rejects on error encountered
   */
  const onSetActivePlayer = React.useRef(async player => {
    const currentActivePlayer = await getActivePlayerFromLocalstore.current();

    // If current active player in offline storage is the same, only update state
    if (
      currentActivePlayer &&
      currentActivePlayer.platformUserId === player.platformUserId
    ) {
      return setActivePlayer(_activePlayer);
    } else if (currentActivePlayer) {
      // Set active player in offline storage to inactive
      const inactivePlayer = Object.assign({}, currentActivePlayer, {
        isActive: false
      });

      try {
        await localstore.setItem(
          currentActivePlayer.platformUserId,
          inactivePlayer
        );
      } catch (err) {
        console.warn("Something went wrong writing to local", err);
      }
    }

    const _activePlayer = Object.assign({}, player, { isActive: true });

    setActivePlayer(_activePlayer);

    try {
      localstore.setItem(player.platformUserId, _activePlayer);
    } catch (err) {
      console.warn("Something went wrong writing to local", err);
    }
  });

  // Runs once on app mount
  React.useEffect(() => {
    getActivePlayerFromLocalstore
      .current()
      .then(player => player && onSetActivePlayer.current(player))
      .catch(err =>
        console.warn("Something went wrong getting the last legend", err)
      );
  }, []);

  return (
    <ActivePlayerContext.Provider
      value={{
        activePlayer,
        setActivePlayer: onSetActivePlayer.current
      }}
    >
      {props.children}
    </ActivePlayerContext.Provider>
  );
};

const useActivePlayer = () => {
  const { activePlayer, getActivePlayer, setActivePlayer } = React.useContext(
    ActivePlayerContext
  );

  return [activePlayer, { getActivePlayer, setActivePlayer }];
};

export { ActivePlayerProvider, useActivePlayer };
export default ActivePlayerContext;
