import { html, render } from "lit-html";

import * as styles from './styles'
import { keyboardIcon, psIcon, xboxIcon } from "../../components";
import logo from '../../images/legend-alert-logo.svg'
import * as templates from './templates'

const onConfirmPlayerDetails = async () => {
  const platformChoice = document.querySelector("#platform").value;
  const playerTag = document.querySelector("#player-tag").value;

  if (!platformChoice || !playerTag) {
    // Keen to find better solution to mimic React-like controlflow for re-renders
    // this approach has a _slightly_ confusing controlflow IMO 🤷‍♂️
    return renderPlayerDetailsView({
      errorMsg: 'Please complete the form',
      hasError: true,
    });
  }

  renderPlayerDetailsView({ isLoadingResults: true })

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

    return renderPlayerDetailsView({
      errorMsg: 'Something went wrong with that search',
      hasError: true,
    });
  })
  .then(res => {
    if (!res.ok) {
      console.warn('Something went wrong')

      return renderPlayerDetailsView({
        errorMsg: 'Something went wrong with that search',
        hasError: true,
      });
    }

    renderPlayerDetailsView({ isLoadingResults: false })

    return res.json()
  })

  if (!data.length) {
    return console.warn('no players returned in search')
  }

  toggleShowReults(true)

  // CHANGE TO ARGUMENT ON RENDER METHOD
  render(
    templates.searchResults(data, toggleShowReults),
    document.getElementById('search-results')
  )
};

const toggleShowReults = show => {
  // Feels like overkill to create custom WC for the slider (#slider-container),
  // its only used in one place and improves the readability of PlayerDetails,
  // so class toggle is preferred over props
  return show
    ? document.querySelector('#slider-container').classList.add('show-results')
    : document.querySelector('#slider-container').classList.remove('show-results')
}

const onPlatformOptionSelected = ({ target }) => {
  const options = document.querySelectorAll(".platform-opt button")
  const platformChoice = document.querySelector("#platform")

  options.forEach(input => input.removeAttribute('selected'))

  target.setAttribute('selected', '')

  platformChoice.value = target.dataset['option']
}

/**
 * Dynamic template renderer
 *
 * @param  {Boolean} [isLoadingResults=false] Network loading state for player search
 * @param  {Boolean} [hasError=false]         Invalid form or network error
 * @param  {String}  [errorMsg]               Error message to display in UI
 * @return {Object}                           lit-html renderResult
 */
function renderPlayerDetailsView({
  isLoadingResults = false,
  hasError = false,
  errorMsg = ''
} = {}) {

  return render(html`
    <section class=${styles.container}>
      <div class=${styles.logo}>
        <img src=${logo} alt="Legend Alert Logo | Siren by Mohamad Arif Prasetyo from the Noun Project" />
      </div>
      <h1>Legend Alert</h1>
      <div id="slider-container" class=${styles.detailsSlider}>
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
              ${hasError
                ? html`<p class="error-msg">${errorMsg}</p>`
                : null
              }
              ${templates.submitFormButton({
                disabled: isLoadingResults,
                onSubmit: onConfirmPlayerDetails
              })}
            </form>
          </section>
          <section class="pane" id="search-results"></section>
        </div>
      </div>
    </section>
  `, document.body)
}

// Potentially pass in data from app root? 🤔
const PlayerDetails = () => {

  return renderPlayerDetailsView()
}

export default PlayerDetails;
