import * as React from "react";
import { css } from "linaria";
import { Stat } from '../types'

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
    grid-template-columns: repeat(1, 100%);
    background-color: var(--color-primary);

    @media (min-width: 1100px) {
      grid-template-columns: repeat(3, 33.333%);
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

interface StatsGridProps {
  stats: Stat[]
}

/**
 * Main stats grid for a single Apex Legend
 */
const StatsGrid: React.FunctionComponent<StatsGridProps> = ({
  stats
}): JSX.Element => (
  <section className={styles.container}>
    <div className={styles.grid}>
      {stats.map(({ categoryName, displayValue, name }) => (
        <div className={styles.statsItem} data-testid="stats-item" key={name}>
          <div>
            <h2 className="stat-value">{displayValue}</h2>
          </div>
          <div>
            <h3 className="stat-name">{name}</h3>
          </div>
          <div>
            <p>
              Category:
              <span className="stat-category">{categoryName}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default StatsGrid;
