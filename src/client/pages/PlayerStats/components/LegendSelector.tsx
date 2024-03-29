import * as React from "react";
import { ArrowIcon, SearchIcon } from "../../../ui-icons";
import Link from "../../../primitives/Link";
import { styled } from "linaria/react";
import { Legend } from "../types";

const Container = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background: var(--color-offwhite);
  width: 40vw;
  height: 100vh;
  transform: translateX(-40vw);

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
    width: 20vw;
    position: unset;
  }
`;

const SearchLinkContainer = styled.div`
  display: none;
  height: 3rem;
  justify-content: flex-start;
  align-items: center;

  ${Link} {
    padding: 0 var(--spacing-base);
  }

  @media (min-width: 1024px) {
    display: flex;
  }
`;

const LegendList = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
  list-style: none;

  @media (min-width: 1024px) {
    height: calc(100% - 3rem);
  }
`;

const LegendItem = styled.li`
  display: flex;
  flex: none;
  width: 100%;
  justify-content: space-between;
  padding: var(--spacing-base) 1rem;
  margin-bottom: var(--spacing-double);
  cursor: pointer;
  color: ${({ isActiveLegend }: { isActiveLegend: boolean }): string =>
    isActiveLegend ? "var(--color-primary)" : "var(--color-dark)"};

  path {
    fill: ${({ isActiveLegend }: { isActiveLegend: boolean }): string =>
      isActiveLegend ? "var(--color-primary)" : "var(--color-dark)"};
  }
`;

interface IonLegendSelected {
  (legend: Legend): void;
}

interface LegendSelectorProps {
  activeLegendName: string;
  legends: Legend[];
  onLegendSelected: IonLegendSelected;
}

const LegendSelector: React.FunctionComponent<LegendSelectorProps> = ({
  activeLegendName,
  legends,
  onLegendSelected
}): JSX.Element => (
  <Container>
    <SearchLinkContainer>
      <Link data-testid="player-search-link_lgScreen" to="/">
        <SearchIcon color="white" width="1.25rem" />
      </Link>
    </SearchLinkContainer>
    <LegendList>
      {legends.map((legend: Legend) => (
        <LegendItem
          data-testid="legend-option"
          isActiveLegend={legend.legendName === activeLegendName}
          key={legend.legendName}
          onClick={() => onLegendSelected(legend)}
        >
          {legend.legendName}
          <ArrowIcon direction="right" height="100%" width="0.55rem" />
        </LegendItem>
      ))}
    </LegendList>
  </Container>
);

export default LegendSelector;
