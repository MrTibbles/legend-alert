import { html } from "lit-html";
import { repeat } from "lit-html/directives/repeat";
import { css } from "linaria";

const styles = {
  container: css`
    position: relative;
    z-index: var(--depth-layer2);
    background: transparent;
    margin-top: -120px;

    &:before {
      content: "";
      position: absolute;
      top: -75px;
      display: block;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 0 77px 100vw;
      border-color: transparent transparent var(--color-primary) transparent;
    }

    &:after {
      content: "";
      position: absolute;
      bottom: -75px;
      display: block;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 77px 100vw 0 0;
      border-color: var(--color-primary) transparent transparent transparent;
    }
  `,
  grid: css`
    display: grid;
    grid-template-columns: repeat(1, 100vw);
    /* display: flex;
    flex-direction: column; */
    background-color: var(--color-primary);

    @media (min-width: 1100px) {
      grid-template-columns: repeat(3, 33.333vw);
    }
  `,
  statsItem: css`
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 1rem 0;

    .stat-value {
      color: var(--color-white);
      font-size: 3.5rem;
      margin: 0 0 1rem;
    }

    .stat-name {
      margin: 0;
    }
  `
};

/**
 * Main stats grid for a single Apex Legend
 *
 * @param  {Array} stats Available stats from TRN response
 * @return {Object}      lit-html renderResult
 */
const statsGrid = ({ stats }) => {
  return html`
    <section class=${styles.container}>
      <div class=${styles.grid}>
        ${repeat(
          stats,
          ({ metadata }) => metadata.key,
          stat => html`
            <div class=${styles.statsItem}>
              <div>
                <h2 class="stat-value">${stat.displayValue}</h2>
              </div>
              <div>
                <h3 class="stat-name">${stat.metadata.name}</h3>
              </div>
              <div>
                <p>
                  Category:
                  <span class="stat-category"
                    >${stat.metadata.categoryName}</span
                  >
                </p>
              </div>
            </div>
          `
        )}
      </div>
    </section>
  `;
};

export default statsGrid;
