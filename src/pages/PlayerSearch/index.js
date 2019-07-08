import React from "react";

import useTrackerNetworkAPI from "../../hooks/useTrackerNetworkAPI";
import * as styles from "./styles";
import logo from "../../images/legend-alert-logo.svg";
import { useActivePlayer } from "../../context/ActivePlayer";

import * as Components from "./components";

const PlayerSearch = () => {
  const activePlayer = useActivePlayer();
  const [showResults, toggleShowReults] = React.useState(false);
  const [networkState, doFetch] = useTrackerNetworkAPI();

  const submitPlayerSearch = React.useRef((platformChoice, playerHandle) => {
    doFetch(
      `/apex-api/v2/apex/standard/search?platform=${platformChoice}&query=${playerHandle}`
    );
  });

  React.useEffect(() => {
    if (networkState.data) toggleShowReults(true);
  }, [networkState]);

  return (
    <section className={styles.container}>
      {activePlayer ? (
        <Components.ViewActivePlayer player={activePlayer} />
      ) : null}
      <div className={styles.logo}>
        <img
          alt="Legend Alert Logo | Siren by Mohamad Arif Prasetyo from the Noun Project"
          src={logo}
        />
      </div>
      <h1>Legend Alert</h1>
      <Components.DetailsSlider showResults={showResults}>
        <div className="slider">
          <Components.PlayerDetailsForm
            searching={networkState.loading}
            submitPlayerSearch={submitPlayerSearch.current}
          />
          <Components.PlayerSearchResults
            goBack={toggleShowReults}
            results={networkState.data}
          />
        </div>
      </Components.DetailsSlider>
    </section>
  );
};

export default PlayerSearch;
