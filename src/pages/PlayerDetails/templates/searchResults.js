import { html } from "lit-html";

// import * as styles from '../styles'

const searchResultsMarkup = (results = []) => html`
  <p>${results.length}</p>
`

export default searchResultsMarkup
