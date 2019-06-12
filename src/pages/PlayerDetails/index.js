import { html } from "lit-html";

import * as styles from './styles'
import { keyboardIcon, psIcon, xboxIcon } from "../../components";
import logo from '../../images/legend-alert-logo.svg'

const onConfirmPlayerDetails = () => {
  const platformChoice = document.querySelector("#platform").value;
  const playerTag = document.querySelector("#player-tag").value;

  console.info(`Platform: ${platformChoice}, Player tag: ${playerTag}`);
};

const onPlatformOptionSelected = ({ target }) => {
  const options = document.querySelectorAll(".platform-opt button")
  const platformChoice = document.querySelector("#platform")

  options.forEach(input => input.removeAttribute('selected'))

  target.setAttribute('selected', '')

  platformChoice.value = target.dataset['option']
}

const markup = html`
  <section class=${styles.container}>
    <div class=${styles.logo}>
      <img src=${logo} alt="Legend Alert Logo | Siren by Mohamad Arif Prasetyo from the Noun Project" />
    </div>
    <h1>Legend Alert</h1>
    <h2>Enter your player details below</h2>
    <form>
      <div class=${styles.formGroup}>
        <h3>Which Platform?</h3>
        <div class=${styles.platformChoices}>
          <div class="platform-opt">
            <button type="button" @click=${onPlatformOptionSelected} data-option="ps">${psIcon}</button>
          </div>
          <div class="platform-opt">
            <button type="button" @click=${onPlatformOptionSelected} data-option="xbox">${xboxIcon}</button>
          </div>
          <div class="platform-opt">
            <button type="button" @click=${onPlatformOptionSelected} data-option="pc">${keyboardIcon}</button>
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
`;

export default markup;
