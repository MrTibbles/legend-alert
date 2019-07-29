import React from "react";
import PropTypes from "prop-types";
import Button from "../../../primitives/Button";
import { useActivePlayer } from "../../../context/ActivePlayer";
import { withRouter } from "react-router-dom";

import {
  backButton,
  searchResultsContainer,
  searchResultsList
} from "../styles";

const PlayerSearchResults = ({ goBack, history, results = [] }) => {
  // eslint-disable-next-line no-unused-vars
  const [_, setActivePlayer] = useActivePlayer();

  const onClickGoBack = () => goBack(false);

  const onSelectLegend = legendIdx => {
    setActivePlayer(results[legendIdx]);

    history.push("/stats");
  };

  if (!results.length) {
    return (
      <section className="pane">
        <div className={searchResultsContainer}>
          <button className={backButton} onClick={onClickGoBack} type="button">
            <p>Search again</p>
          </button>
          <h3 className="error-msg text-center">
            No players were found with those details
          </h3>
        </div>
      </section>
    );
  }

  return (
    <section className="pane" data-testid="search-results">
      <div className={searchResultsContainer}>
        <Button className={backButton} onClick={onClickGoBack}>
          <p>Search again</p>
        </Button>
        <h3>The following players matched your search</h3>
        <p>Select one to see how much of a legend they are:</p>
        <ul className={searchResultsList} data-testid="search-results">
          {results.map(({ platformSlug, platformUserId }, idx) => (
            <li
              data-testid={`${platformSlug}-${platformUserId}`}
              key={platformSlug}
              onClick={() => onSelectLegend(idx)}
            >
              <h3>
                <span className="highlight" data-testid="user-handle">
                  {platformUserId}
                </span>
                &nbsp;on&nbsp;
                <span
                  className="highlight uppercase"
                  data-testid="user-platform"
                >
                  {platformSlug}
                </span>
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

PlayerSearchResults.propTypes = {
  goBack: PropTypes.func.isRequired,
  history: PropTypes.object,
  results: PropTypes.array
};

export default withRouter(PlayerSearchResults);
