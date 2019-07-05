import { html } from "lit-html";
import localforage from "localforage";

import {
  backButton,
  searchResultsContainer,
  searchResultsList
} from "../styles";

/**
 * Render search results returned from TRN Tracker Search API
 * @param  {Function} goBack  Handler to go back to details form
 * @param  {Array}    results TRN CollectorSearchResult objects
 * @return {Object}           lit-html renderResult
 */
const searchResultsMarkup = ({ goBack, results }) => {
  const onClickGoBack = () => goBack(false);

  const onSelectLegend = async legendIdx => {
    // Enhance this storage to persist stats object also, PWA
    await localforage.setItem("activePlayer", results[legendIdx]);

    // tmp solution to change route - change to custom event or something
    window.location.reload();
  };

  return html`
    <div class=${searchResultsContainer}>
      <button class=${backButton} @click=${onClickGoBack} type="button">
        <p>Search again</p>
      </button>
      <h3>The following players matched your search</h3>
      <p>Select one to see how much of a legend they are:</p>
      <ul class=${searchResultsList}>
        ${results.map(
          ({ platformSlug, platformUserHandle }, idx) =>
            html`
              <li @click=${() => onSelectLegend(idx)}>
                <h3>
                  <span class="highlight">${platformUserHandle}</span> on
                  <span class="highlight uppercase">${platformSlug}</span>
                </h3>
              </li>
            `
        )}
      </ul>
    </div>
  `;
};

export default searchResultsMarkup;
