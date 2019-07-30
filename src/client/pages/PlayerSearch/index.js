import React from "react";
import useGraphQLAPI from "../../hooks/useGraphQLAPI";
import * as styles from "./styles";
import logo from "../../images/legend-alert-logo.svg";
import { useActivePlayer } from "../../context/ActivePlayer";

import * as Components from "./components";
import searchPlayersQuery from "./queries/searchPlayersQuery";

const PlayerSearch = () => {
  const [activePlayer] = useActivePlayer();
  const [showResults, toggleShowResults] = React.useState(false);
  const [networkState, submitQuery] = useGraphQLAPI();

  const submitPlayerSearch = React.useRef((platformChoice, playerUserId) => {
    const query = searchPlayersQuery({ platformChoice, playerUserId });

    submitQuery(query);
  });

  React.useEffect(() => {
    if (networkState.data) toggleShowResults(true);
  }, [networkState]);

  return (
    <div className={styles.container}>
      {activePlayer ? (
        <Components.ViewActivePlayer
          playerUserId={activePlayer.platformUserId}
        />
      ) : null}
      <section className={styles.contentArea}>
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
            {networkState.data ? (
              <Components.PlayerSearchResults
                goBack={toggleShowResults}
                results={networkState.data.searchPlayers}
              />
            ) : null}
          </div>
        </Components.DetailsSlider>
      </section>
    </div>
  );
};

export default PlayerSearch;
