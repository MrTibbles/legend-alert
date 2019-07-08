import React from "react";
import { useActivePlayer } from "../../context/ActivePlayer";

import * as utils from "./utils";
import * as Components from "./components";

const PlayerStats = () => {
  const activePlayer = useActivePlayer();
  const [activeLegend, setActiveLegend] = React.useState(null);
  const [networkState, setNeworkState] = React.useState({
    data: undefined,
    error: undefined,
    loading: false
  });

  const fetchPlayerStats = React.useRef(
    async (platformSlug, platformUserHandle) => {
      setNeworkState({ ...networkState, error: undefined, loading: true });

      const { data } = await fetch(
        `/apex-api/v1/apex/standard/profile/${platformSlug}/${platformUserHandle}`,
        {
          credentials: "omit",
          headers: {
            "TRN-Api-Key": TRN_TOKEN
          },
          mode: "cors"
        }
      )
        .catch(err => {
          setNeworkState({
            ...networkState,
            error: err.message,
            loading: false
          });
        })
        .then(res => {
          if (!res.ok) {
            setNeworkState({
              ...networkState,
              error: "Something went wrong",
              loading: false
            });
          }

          return res.json();
        });

      setNeworkState({
        ...networkState,
        data,
        loading: false
      });

      setActiveLegend(utils.getActiveLegend(data.children));
    }
  );

  React.useEffect(() => {
    document.body.classList.add("dark");

    if (!activePlayer) return;

    const { platformSlug, platformUserHandle } = activePlayer;

    fetchPlayerStats.current(platformSlug, platformUserHandle);
  }, [activePlayer, fetchPlayerStats]);

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
