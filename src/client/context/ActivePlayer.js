import React from "react";
import PropTypes from "prop-types";
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
    // has a select fields from a Tracker Network search result object as their value
    const player = players.length
      ? players.find(player => {
          return Object.values(player).find(({ isActive }) => isActive);
        })
      : undefined;

    // Return the Tracker Network search response data
    return player ? Object.values(player)[0] : undefined;
  });

  /**
   * Set the active player
   *
   * @param  {Object}  player Tracker Network player search response object
   * @return {Promise}        Resolves with item being stored, rejects on error encountered
   */
  const onSetActivePlayer = React.useRef(async player => {
    const localActivePlayer = await getActivePlayerFromLocalstore.current();
    const activePlayer = Object.assign(
      {},
      {
        platformSlug: player.platformSlug,
        platformUserId: player.platformUserId.toLowerCase()
      },
      { isActive: true }
    );

    // If current active player in offline storage is the same, only update state
    if (
      localActivePlayer &&
      localActivePlayer.platformUserId === activePlayer.platformUserId
    ) {
      return setActivePlayer(activePlayer);
    } else if (localActivePlayer) {
      // Set active player in offline storage to inactive
      const inactivePlayer = Object.assign({}, localActivePlayer, {
        isActive: false
      });

      try {
        await localstore.setItem(
          localActivePlayer.platformUserId,
          inactivePlayer
        );
      } catch (err) {
        console.warn("Something went wrong writing to local", err);
      }
    }

    setActivePlayer(activePlayer);

    localstore
      .setItem(activePlayer.platformUserId, activePlayer)
      .catch(err => console.warn("Something went wrong writing to local", err));
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

ActivePlayerProvider.propTypes = {
  children: PropTypes.node.isRequired
};

const useActivePlayer = () => {
  const { activePlayer, setActivePlayer } = React.useContext(
    ActivePlayerContext
  );

  return [activePlayer, setActivePlayer];
};

export { ActivePlayerProvider, useActivePlayer };
export default ActivePlayerContext;
