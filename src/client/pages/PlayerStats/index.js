import React from "react";
import { css } from "linaria";
import { styled } from "linaria/react";
import { useActivePlayer } from "../../context/ActivePlayer";
import useGraphQLAPI from "../../hooks/useGraphQLAPI";
import * as utils from "./utils";
import * as Components from "./components";
import playerStatsQuery from "./queries/playerStatsQuery";

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  transition: transform 250ms ease-out;
  transform: ${({ showLegends }) => `translateX(${showLegends ? "25vw" : 0})`};

  @media (min-width: 1024px) {
    display: flex;
    transform: translateX(0);
  }
`;

const contentArea = css`
  @media (min-width: 1024px) {
    width: 75vw;
  }
`;

const PlayerStats = () => {
  const [activePlayer] = useActivePlayer();
  const [networkState, submitQuery] = useGraphQLAPI();
  const [activeLegend, setActiveLegend] = React.useState(null);
  const [legendList, setLegendList] = React.useState([]);
  const [mobileLegendListIsVis, setMobileLegendListVis] = React.useState(false);

  const fetchPlayerStats = React.useRef((platformSlug, platformUserId) => {
    const query = playerStatsQuery({ platformSlug, platformUserId });

    submitQuery(query);
  });

  const onShowMobileLegendList = () => {
    setMobileLegendListVis(!mobileLegendListIsVis);
  };

  const onLegendSelected = legend => {
    setActiveLegend(legend);
    setMobileLegendListVis(false);
  };

  React.useEffect(() => {
    if (!activePlayer) return;

    const { platformSlug, platformUserId } = activePlayer;

    fetchPlayerStats.current(platformSlug, platformUserId);
  }, [activePlayer, fetchPlayerStats]);

  React.useEffect(() => {
    if (networkState.data) {
      const legendList = utils.getLegendList(networkState.data.playerStats);
      setLegendList(legendList);

      const activeInGameLegend = utils.getActiveLegend(legendList);
      setActiveLegend(activeInGameLegend);
    }
  }, [networkState]);

  if (networkState.error) {
    return (
      <div>
        <h2>{networkState.error}</h2>
      </div>
    );
  }

  if (networkState.loading || !activeLegend) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <Container showLegends={mobileLegendListIsVis}>
      {legendList.length > 0 ? (
        <Components.LegendSelector
          activeLegendName={activeLegend.legendName}
          legends={legendList}
          onLegendSelected={onLegendSelected}
        />
      ) : null}
      <main className={contentArea}>
        <Components.NavigationBar
          hasMoreLegends={legendList.length > 0}
          onShowMobileLegendList={onShowMobileLegendList}
        />
        <Components.HeroSection
          image={activeLegend.tallImageUrl}
          platformUserId={activePlayer.platformUserId}
          playerPlatform={activePlayer.platformSlug}
        />
        <Components.StatsGrid stats={activeLegend.stats} />
      </main>
    </Container>
  );
};

export default PlayerStats;
