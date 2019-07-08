import React from "react";
import localforage from "localforage";

const ActivePlayerContext = React.createContext();

const ActivePlayerProvider = props => {
  const [activePlayer, setActivePlayer] = React.useState(null);

  React.useEffect(() => {
    localforage
      .getItem("activePlayer")
      .then(setActivePlayer)
      .catch(err =>
        console.warn("Something went wrong getting the last legend", err)
      );
  }, []);

  return (
    <ActivePlayerContext.Provider value={activePlayer}>
      {props.children}
    </ActivePlayerContext.Provider>
  );
};

const useActivePlayer = () => React.useContext(ActivePlayerContext);

export { ActivePlayerProvider, useActivePlayer };
export default ActivePlayerContext;
