import React from "react";
import { styled } from "linaria/react";

const Container = styled.aside`
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
`;

const LegendList = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
  list-style: none;

  li {
    padding: var(--spacing-base) 0;
    margin-bottom: var(--spacing-double);
    cursor: pointer;
  }
`;

const LegendSelector = ({ legends, onLegendSelected }) => (
  <Container>
    <LegendList>
      {legends.map(legend => (
        <li key={legend.legendName} onClick={() => onLegendSelected(legend)}>
          {legend.legendName}
        </li>
      ))}
    </LegendList>
  </Container>
);

export default LegendSelector;
