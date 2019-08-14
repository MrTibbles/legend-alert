import React from "react";
import PropTypes from "prop-types";
import { localstore } from "../services";

const creaateActivePlayerObj = player => {
  return Object.assign(
    {},
    {
      platformSlug: player.platformSlug,
      platformUserId: player.platformUserId.toLowerCase()
    },
    { isActive: true }
  );
};

const createInActivePlayerObj = player => {
  return Object.assign({}, player, {
    isActive: false
  });
};

const ActivePlayerContext = React.createContext();

const ActivePlayerProvider = props => {
  const [activePlayer, setActivePlayer] = React.useState(null);

  /**
   * Retrieve the last active player stored in offline storage
   *
   * @return {Object|undefined} Tracker Network player search result or undefined
   */
  const getActivePlayerFromLocalstore = React.useRef(async () => {
    const player = await localstore.getOfflineActivePlayer();

    return player;
  });

  /**
   * Set the active player
   *
   * @param  {Object}  player Tracker Network player search response object
   * @return {Promise}        Resolves with item being stored, rejects on error encountered
   */
  const onSetActivePlayer = React.useRef(async player => {
    const localActivePlayer = await getActivePlayerFromLocalstore.current();
    const activePlayer = creaateActivePlayerObj(player);

    // If current active player in offline storage is the same, only update state
    if (
      localActivePlayer &&
      localActivePlayer.platformUserId === activePlayer.platformUserId
    ) {
      return setActivePlayer(activePlayer);
    }

    if (localActivePlayer) {
      // Set active player in offline storage to inactive
      const inactivePlayer = createInActivePlayerObj(localActivePlayer);

      await localstore
        .setItem(localActivePlayer.platformUserId, inactivePlayer)
        .catch(console.warn);
    }

    setActivePlayer(activePlayer);

    localstore
      .setItem(activePlayer.platformUserId, activePlayer)
      .catch(console.warn);
  });

  // Runs once on app mount
  React.useEffect(() => {
    getActivePlayerFromLocalstore
      .current()
      .then(player => player && onSetActivePlayer.current(player))
      .catch(console.warn);
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
