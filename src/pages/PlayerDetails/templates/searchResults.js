import { html } from "lit-html";

import { backButton, searchResultsContainer, searchResultsList } from '../styles'

const searchResultsMarkup = (results = [], toggleShowReults = () => {}) => {

  const goBack = () => toggleShowReults(false)

  return html`
    <div class=${searchResultsContainer}>
      <button class=${backButton} @click=${goBack} type="button">
        <p>Search again</p>
      </button>
      <h3>The following players matched your search, select one to see how much of a legend they are:</h3>
      <ul class=${searchResultsList}>
        ${results.map(({ platformSlug, platformUserHandle }) =>
          html`
            <li @click=${() => console.info('LEGEND', platformUserHandle)}>
              <h3><span class="highlight">${platformUserHandle}</span> on <span class="highlight uppercase">${platformSlug}</span></h3>
            </li>
          `
        )}
      </ul>
    </div>
  `
}

export default searchResultsMarkup
