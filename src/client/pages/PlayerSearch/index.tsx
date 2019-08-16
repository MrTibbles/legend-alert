import * as React from "react";
import useGraphQLAPI from "../../hooks/useGraphQLAPI";
import { useActivePlayer } from "../../context/ActivePlayer";

import * as Components from "./components";
import searchPlayersQuery from "./queries/searchPlayersQuery";
import { PlayerSearchQuery } from "./types";

const PlayerSearch: React.FunctionComponent = (): JSX.Element => {
  const { activePlayer } = useActivePlayer();
  const [showResults, toggleShowResults] = React.useState(false);
  const [networkState, submitQuery] = useGraphQLAPI<PlayerSearchQuery>();

  const submitPlayerSearch = React.useRef(
    (platformChoice: string, playerUserId: string) => {
      const query = searchPlayersQuery({ platformChoice, playerUserId });

      submitQuery(query);
    }
  );

  React.useEffect(() => {
    if (networkState.data) toggleShowResults(true);
  }, [networkState]);

  return (
    <Components.Container>
      {activePlayer ? (
        <Components.ViewActivePlayer
          playerUserId={activePlayer.platformUserId}
        />
      ) : null}
      <Components.ContentArea>
        <Components.Logo />
        <h1>Legend Alert</h1>
        <Components.DetailsSlider showResults={showResults}>
          <React.Fragment>
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
          </React.Fragment>
        </Components.DetailsSlider>
      </Components.ContentArea>
    </Components.Container>
  );
};

export default PlayerSearch;
