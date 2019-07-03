import { html } from "lit-html";

import { backButton, searchResultsContainer, searchResultsList } from '../styles'

/**
 * Render search results returned from TRN Tracker Search API
 * @param  {Array}    results           TRN CollectorSearchResult objects
 * @param  {Function} toggleShowReults  Handler to go back to details form
 * @return {Object}                     lit-html renderResult
 */
const searchResultsMarkup = (results, toggleShowReults) => {

  const goBack = () => toggleShowReults(false)

  const onSelectLegend = legendIdx => {
    console.info(results[legendIdx])
  }

  return html`
    <div class=${searchResultsContainer}>
      <button class=${backButton} @click=${goBack} type="button">
        <p>Search again</p>
      </button>
      <h3>The following players matched your search</h3>
      <p>Select one to see how much of a legend they are:</p>
      <ul class=${searchResultsList}>
        ${results.map(({ platformSlug, platformUserHandle }, idx) =>
          html`
            <li @click=${() => onSelectLegend(idx)}>
              <h3><span class="highlight">${platformUserHandle}</span> on <span class="highlight uppercase">${platformSlug}</span></h3>
            </li>
          `
        )}
      </ul>
    </div>
  `
}

export default searchResultsMarkup
