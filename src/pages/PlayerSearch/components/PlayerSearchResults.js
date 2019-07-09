import React from "react";
import PropTypes from "prop-types";
import localforage from "localforage";
import { withRouter } from "react-router-dom";

import {
  backButton,
  searchResultsContainer,
  searchResultsList
} from "../styles";

const PlayerSearchResults = ({ goBack, history, results = [] }) => {
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

  const onClickGoBack = () => goBack(false);

  const onSelectLegend = async legendIdx => {
    await localforage.setItem("activePlayer", results[legendIdx]);

    // tmp solution to change route - change to custom event or something
    history.push("/stats");
  };

  return (
    <section className="pane" data-testid="search-results">
      <div className={searchResultsContainer}>
        <button className={backButton} onClick={onClickGoBack} type="button">
          <p>Search again</p>
        </button>
        <h3>The following players matched your search</h3>
        <p>Select one to see how much of a legend they are:</p>
        <ul className={searchResultsList} data-testid="search-results">
          {results.map(({ platformSlug, platformUserHandle }, idx) => (
            <li
              data-testid={`${platformSlug}-${platformUserHandle}`}
              key={platformSlug}
              onClick={() => onSelectLegend(idx)}
            >
              <h3>
                <span className="highlight" data-testid="user-handle">
                  {platformUserHandle}
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
  results: PropTypes.array
};

export default withRouter(PlayerSearchResults);
