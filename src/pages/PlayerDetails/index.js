import { html } from "lit-html";

import * as styles from './styles'
import { keyboardIcon, psIcon, xboxIcon } from "../../components";
import logo from '../../images/legend-alert-logo.svg'

const onConfirmPlayerDetails = () => {
  const platformChoice = document.querySelector("#platform").value;
  const playerTag = document.querySelector("#player-tag").value;

  console.info(`Platform: ${platformChoice}, Player tag: ${playerTag}`);
};

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
        <div class=${styles.platformChoice}>
          <div>
            <input type="radio" id="platform" name="platform" value="psn" />
            <label for="psn">${psIcon}</label>
          </div>
          <div>
            <input type="radio" id="platform" name="platform" value="xbox" />
            <label for="xbox">${xboxIcon}</label>
          </div>
          <div>
            <input type="radio" id="platform" name="platform" value="pc" />
            <label for="pc">${keyboardIcon}</label>
          </div>
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
