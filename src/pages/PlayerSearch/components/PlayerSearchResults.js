import React from "react";
import localforage from "localforage";

import {
  backButton,
  searchResultsContainer,
  searchResultsList
} from "../styles";

const PlayerSearchResults = ({ goBack, results = [] }) => {
  if (!results.length) return null;

  const onClickGoBack = () => goBack(false);

  const onSelectLegend = async legendIdx => {
    await localforage.setItem("activePlayer", results[legendIdx]);

    // tmp solution to change route - change to custom event or something
    window.location.reload();
  };

  return (
    <section className="pane">
      <div className={searchResultsContainer}>
        <button className={backButton} onClick={onClickGoBack} type="button">
          <p>Search again</p>
        </button>
        <h3>The following players matched your search</h3>
        <p>Select one to see how much of a legend they are:</p>
        <ul className={searchResultsList}>
          {results.map(({ platformSlug, platformUserHandle }, idx) => (
            <li key={platformSlug} onClick={() => onSelectLegend(idx)}>
              <h3>
                <span className="highlight">{platformUserHandle}</span> on
                <span className="highlight uppercase">{platformSlug}</span>
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PlayerSearchResults;
