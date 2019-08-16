import * as React from "react";
import { useActivePlayer } from "../../context/ActivePlayer";
import useGraphQLAPI from "../../hooks/useGraphQLAPI";
import { getInGameActiveLegend, getLegendList } from "./utils";
import * as Components from "./components";
import playerStatsQuery from "./queries/playerStatsQuery";
import { Legend, PlayerStatsQuery } from "./types";

const PlayerStats: React.FunctionComponent = (): JSX.Element => {
  const { activePlayer } = useActivePlayer();
  const [networkState, submitQuery] = useGraphQLAPI<PlayerStatsQuery>();
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
      const { playerStats } = networkState.data;

      const legendList: Legend[] = getLegendList(playerStats);
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
    <Components.Container showLegends={mobileLegendListIsVis}>
      {legendList.length > 0 ? (
        <Components.LegendSelector
          activeLegendName={activeLegend.legendName}
          legends={legendList}
          onLegendSelected={onLegendSelected}
        />
      ) : null}
      <Components.ContentArea>
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
      </Components.ContentArea>
    </Components.Container>
  );
};

export default PlayerStats;
