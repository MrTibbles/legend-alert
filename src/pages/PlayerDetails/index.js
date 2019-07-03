import { html, render } from "lit-html";

import * as styles from './styles'
import { keyboardIcon, psIcon, xboxIcon } from "../../components";
import logo from '../../images/legend-alert-logo.svg'
import searchResultsTpl from './templates/searchResults'

const onConfirmPlayerDetails = async () => {
  const platformChoice = document.querySelector("#platform").value;
  const playerTag = document.querySelector("#player-tag").value;

  const { data } = await fetch(
    `/apex-api/v2/apex/standard/search?platform=${platformChoice}&query=${playerTag}`,
    {
      credentials: 'omit',
      headers: {
        'TRN-Api-Key': TRN_TOKEN,
      },
      mode: 'cors',
  })
  .catch(err => {
    console.warn(err)
  })
  .then(res => {
    if (!res.ok) {
      console.warn('Something went wrong')
    }

    return res.json()
  })

  if (!data.length) {
    return console.warn('no players returned in search')
  }

  render(searchResultsTpl(data), document.getElementById('search-results'))
};

const onPlatformOptionSelected = ({ target }) => {
  const options = document.querySelectorAll(".platform-opt button")
  const platformChoice = document.querySelector("#platform")

  options.forEach(input => input.removeAttribute('selected'))

  target.setAttribute('selected', '')

  platformChoice.value = target.dataset['option']
}

const playerDetailsMarkup = html`
  <section class=${styles.container}>
    <div class=${styles.logo}>
      <img src=${logo} alt="Legend Alert Logo | Siren by Mohamad Arif Prasetyo from the Noun Project" />
    </div>
    <h1>Legend Alert</h1>
    <div class=${styles.detailsSlider}>
      <div class="slider">
        <section class="pane" id="enter-player-details">
          <h2>Enter your player details below</h2>
          <form>
            <div class=${styles.formGroup}>
              <h3>Which Platform?</h3>
              <div class=${styles.platformChoices}>
                <div class="platform-opt">
                  <button type="button" @click=${onPlatformOptionSelected} data-option="psn">${psIcon}</button>
                </div>
                <div class="platform-opt">
                  <button type="button" @click=${onPlatformOptionSelected} data-option="xbl">${xboxIcon}</button>
                </div>
                <div class="platform-opt">
                  <button type="button" @click=${onPlatformOptionSelected} data-option="origin">${keyboardIcon}</button>
                </div>
                <input type="hidden" id="platform" />
              </div>
            </div>
            <div class=${styles.formGroup}>
              <h3>Player tag</h3>
              <input
                type="text"
                id="player-tag"
                name="player-tag"
                placeholder="absolute-legend"
              />
            </div>
            <button
              class=${styles.confirmBtn}
              @click=${onConfirmPlayerDetails}
              type="button"
            >
              CONFIRM
            </button>
          </form>
        </section>
        <section class="pane" id="search-results"></section>
      </div>
    </div>
  </section>
`;

export default playerDetailsMarkup;
