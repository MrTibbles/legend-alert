import * as React from "react";
import { localstore } from "../services";

const { createContext, useContext, useEffect, useState, useRef } = React;

interface IActivePlayerInput {
  platformSlug: string;
  platformUserId: string;
  isActive?: boolean;
}

interface IActivePlayer {
  platformSlug: string;
  platformUserId: string;
  isActive: boolean;
}

interface ISetActivePlayer {
  (player: IActivePlayerInput): void;
}

interface IActivePlayerContext {
  activePlayer?: IActivePlayer;
  setActivePlayer: ISetActivePlayer;
  [key: string]: IActivePlayer | ISetActivePlayer | undefined;
}

const creaateActivePlayerObj = (player: IActivePlayerInput): IActivePlayer => {
  return Object.assign(
    {},
    {
      platformSlug: player.platformSlug,
      platformUserId: player.platformUserId.toLowerCase()
    },
    { isActive: true }
  );
};

const createInActivePlayerObj = (player: IActivePlayerInput): IActivePlayer => {
  return Object.assign({}, player, {
    isActive: false
  });
};

const ActivePlayerContext = createContext<IActivePlayerContext>({
  setActivePlayer: () => null
});

const ActivePlayerProvider = (props: {
  children: JSX.Element;
}): JSX.Element => {
  const [activePlayer, setActivePlayer] = useState();

  /**
   * Retrieve the last active player stored in offline storage
   */
  const getActivePlayerFromLocalstore = useRef(async () => {
    const player = await localstore.getOfflineActivePlayer();

    return player;
  });

  /**
   * Set the active player
   */
  const onSetActivePlayer = useRef(async (player: IActivePlayerInput) => {
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
  useEffect(() => {
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

const useActivePlayer = () => {
  return useContext<IActivePlayerContext>(ActivePlayerContext);
};

export { ActivePlayerProvider, useActivePlayer };
export default ActivePlayerContext;
