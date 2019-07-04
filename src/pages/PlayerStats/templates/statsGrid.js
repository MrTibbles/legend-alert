import { html } from "lit-html";
import { repeat } from "lit-html/directives/repeat";
import { css } from 'linaria'

const styles = {
  grid: css`
    display: grid;
    grid-template-columns: repeat(2, 50vw);
  `,
  statsContainer: css`
    background-color: var(--color-primary);
    display: flex;
    flex-direction: column;
    text-align: center;
  `
}

class StatItem extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <div class=${styles.statsContainer}>
        <h2 class="stat-value"></h2>
        <h3 class="stat-name"></h3>
        <p class="stat-category"></p>
      </div>
    `
  }

  static get observedAttributes() {
    return ["category", "value", "name"];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    // On construction the attr' values are null, annoyingly, i believe this to
    // be in relation to using html`` - INVESTIGATE FURTHER
    if (oldValue !== newValue) {
      return this.querySelector(`.stat-${attr}`).innerText = newValue
    }
  }

  // connectedCallback() {}
  // disconnectedCallback() {}
}

customElements.define("stat-item", StatItem);

/**
 * Main stats grid for a single Apex Legend
 *
 * @param  {Array} stats Available stats from TRN response
 * @return {Object}      lit-html renderResult
 */
const statsGrid = ({ stats }) => {
  return html`
    <main class="container">
      <div class=${styles.grid}>
        ${repeat(
          stats,
          ({ metadata }) => metadata.key,
          stat => html`
            <stat-item
              category=${stat.metadata.categoryName}
              value=${stat.displayValue}
              name=${stat.metadata.name}
            >
            </stat-item>
          `
        )}
      </div>
    </main>
  `;
};

export default statsGrid;
