import * as React from "react";
import { css } from "linaria";
import { styled } from "linaria/react";
import { useActivePlayer } from "../../context/ActivePlayer";
import useGraphQLAPI from "../../hooks/useGraphQLAPI";
import { getInGameActiveLegend, getLegendList } from "./utils";
import * as Components from "./components";
import playerStatsQuery from "./queries/playerStatsQuery";
import { Legend } from "./types";

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

const PlayerStats: React.FunctionComponent = (): JSX.Element => {
  const { activePlayer } = useActivePlayer();
  const [networkState, submitQuery] = useGraphQLAPI();
  const [activeLegend, setActiveLegend] = React.useState<Legend | null>(null);
  const [legendList, setLegendList] = React.useState<Legend[]>([]);
  const [mobileLegendListIsVis, setMobileLegendListVis] = React.useState(false);

  const fetchPlayerStats = React.useRef(
    (platformSlug: string, platformUserId: string): void => {
      const query = playerStatsQuery({ platformSlug, platformUserId });

      submitQuery(query);
    }
  );

  const onShowMobileLegendList = (): void => {
    setMobileLegendListVis(!mobileLegendListIsVis);
  };

  /* Add Legend interface */
  const onLegendSelected = (legend: Legend): void => {
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
      const legendList: Legend[] = getLegendList(networkState.data.playerStats);
      setLegendList(legendList);

      const activeInGameLegend: Legend = getInGameActiveLegend(legendList);
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
        {activePlayer ? (
          <Components.HeroSection
            image={activeLegend.tallImageUrl}
            platformUserId={activePlayer.platformUserId}
            playerPlatform={activePlayer.platformSlug}
          />
        ) : null}
        <Components.StatsGrid stats={activeLegend.stats} />
      </main>
    </Container>
  );
};

export default PlayerStats;
