import React from "react";
import { useActivePlayer } from "../../context/ActivePlayer";

import useTrackerNetworkAPI from "../../hooks/useTrackerNetworkAPI";
import * as utils from "./utils";
import * as Components from "./components";

const PlayerStats = () => {
  const [activePlayer] = useActivePlayer();
  const [activeLegend, setActiveLegend] = React.useState(null);
  const [networkState, doFetch] = useTrackerNetworkAPI();

  const fetchPlayerStats = React.useRef((platformSlug, platformUserHandle) => {
    doFetch(
      `/apex-api/v1/apex/standard/profile/${platformSlug}/${platformUserHandle}`
    );
  });

  React.useEffect(() => {
    if (!activePlayer) return;

    const { platformSlug, platformUserHandle } = activePlayer;

    fetchPlayerStats.current(platformSlug, platformUserHandle);
  }, [activePlayer, fetchPlayerStats]);

  React.useEffect(() => {
    if (networkState.data) {
      setActiveLegend(utils.getActiveLegend(networkState.data.children));
    }
  }, [networkState]);

  if (networkState.loading || !activeLegend) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (networkState.error) {
    return (
      <div>
        <h2>{networkState.error}</h2>
      </div>
    );
  }

  const activeLegendIconImage = utils.getLegendIconImage(activeLegend);

  return (
    <React.Fragment>
      <Components.HeroSection
        image={activeLegendIconImage}
        playerHandle={activePlayer.platformUserHandle}
        playerPlatform={activePlayer.platformSlug}
      />
      <Components.StatsGrid stats={activeLegend.stats} />
    </React.Fragment>
  );
};

export default PlayerStats;
