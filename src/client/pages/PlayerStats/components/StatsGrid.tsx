import * as React from "react";
import { styled } from "linaria/react";
import { Stat } from "../types";

const Container = styled.section`
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
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 100%);
  background-color: var(--color-primary);

  @media (min-width: 1100px) {
    grid-template-columns: repeat(3, 33.333%);
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 1rem 0;
`;

const StatValue = styled.h2`
  color: var(--color-white);
  font-size: 3.5rem;
  margin: 0 0 1rem;
`;

const StatName = styled.h3`
  margin: 0;
`;

const StatCategory = styled.span`
  font-weight: bold;
`;

interface StatsGridProps {
  stats: Stat[];
}

/**
 * Main stats grid for a single Apex Legend
 */
const StatsGrid: React.FunctionComponent<StatsGridProps> = ({
  stats
}): JSX.Element => (
  <Container>
    <Grid>
      {stats.map(({ categoryName, displayValue, name }) => (
        <StatItem data-testid="stats-item" key={name}>
          <div>
            <StatValue>{displayValue}</StatValue>
          </div>
          <div>
            <StatName>{name}</StatName>
          </div>
          <div>
            <p>
              Category:&nbsp;
              <StatCategory>{categoryName}</StatCategory>
            </p>
          </div>
        </StatItem>
      ))}
    </Grid>
  </Container>
);

export default StatsGrid;
