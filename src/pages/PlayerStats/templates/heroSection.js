import { html } from "lit-html";
import { css } from "linaria";

const styles = {
  container: css`
    height: 60vh;
    background-color: var(--color-dark);
    z-index: var(--depth-layer1);
    padding-top: 75px; /* height of the playerInfo row */
    overflow: hidden;
  `,
  legendImage: css`
    width: auto;
    height: 100%;

    img {
      display: block
      width: 100%;
      transform: translateY(0);

      @media (min-width: 450px) {
        transform: translateY(-45px);
      }
    }
  `,
  playerInfo: css`
    display: flex;
    justify-content: center;
    padding: var(--spacing-base) 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 75px;
  `,
  playerName: css`
    color: var(--color-white);
    margin: 0;
  `
};

const heroSection = ({ image, playerHandle, playerPlatform }) => {
  return html`
    <section class=${styles.container}>
      <div class=${styles.playerInfo}>
        <h3 class=${styles.playerName}>
          ${playerHandle} | <span class="uppercase">${playerPlatform}</span>
        </h3>
      </div>
      <div class=${styles.legendImage}>
        <img src="${image}" alt="Active Legend | Legend Alert" />
      </div>
    </section>
  `;
};

export default heroSection;
