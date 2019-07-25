import React from "react";
import PropTypes from "prop-types";
import ArrowIcon from "../../../ui-icons/ArrowIcon";
import { css } from "linaria";
import { styled } from "linaria/react";

const styles = {
  container: css`
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    background: var(--color-offwhite);
    width: 25vw;
    height: 100vh;
    transform: translateX(-25vw);

    &:before {
      content: "";
      height: 900%; /* TO ENSURE BOTTOM EDGE IS NOT EXPOSED */
      width: 110%;
      box-shadow: 0 0 20px var(--color-primary) inset;
      position: absolute;
      right: 0px;
      top: -5%;
      pointer-events: none;
    }

    @media (min-width: 1024px) {
      transform: translateX(0);
      position: unset;
    }
  `,
  legendList: css`
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
    list-style: none;
  `
};

const LegendItem = styled.li`
  display: flex;
  flex: none;
  width: 100%;
  justify-content: space-between;
  padding: var(--spacing-base) 1rem;
  margin-bottom: var(--spacing-double);
  cursor: pointer;
  color: ${({ isActiveLegend }) =>
    isActiveLegend ? "var(--color-primary)" : "var(--color-dark)"};

  path {
    fill: ${({ isActiveLegend }) =>
      isActiveLegend ? "var(--color-primary)" : "var(--color-dark)"};
  }
`;

const LegendSelector = ({ activeLegendName, legends, onLegendSelected }) => (
  <aside className={styles.container}>
    <ul className={styles.legendList}>
      {legends.map(legend => (
        <LegendItem
          isActiveLegend={legend.legendName === activeLegendName}
          key={legend.legendName}
          onClick={() => onLegendSelected(legend)}
        >
          {legend.legendName}
          <ArrowIcon direction="right" height="100%" width="0.55rem" />
        </LegendItem>
      ))}
    </ul>
  </aside>
);

LegendSelector.propTypes = {
  activeLegendName: PropTypes.string.isRequired,
  legends: PropTypes.array.isRequired,
  onLegendSelected: PropTypes.func.isRequired
};

export default LegendSelector;
