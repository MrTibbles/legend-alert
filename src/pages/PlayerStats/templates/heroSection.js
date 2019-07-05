import { html } from "lit-html";
import { css } from "linaria";

const styles = {
  container: css`
    display: flex;
    height: 60vh;
    background-color: var(--color-dark);
    z-index: var(--depth-layer1);
    justify-content: center;
    overflow: hidden;
  `,
  legendImage: css`
    width: auto;
    height: 100%;

    img {
      display: block
      width: 100%;
      transform: translateY(-45px);
    }
  `
};

const heroSection = ({ image }) => {
  return html`
    <section class=${styles.container}>
      <div class=${styles.legendImage}>
        <img src="${image}" alt="Active Legend | Legend Alert" />
      </div>
    </section>
  `;
};

export default heroSection;
