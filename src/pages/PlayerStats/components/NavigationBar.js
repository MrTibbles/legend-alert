import React from "react";
import PropTypes from "prop-types";
import { styled } from "linaria/react";
import { Button, Link } from "../../../primitives";
import { ListIcon, SearchIcon } from "../../../ui-icons";

const Nav = styled.nav`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: var(--spacing-base);
  z-index: var(--depth-layer2);
  justify-content: ${({ hasMoreLegends }) =>
    hasMoreLegends ? "space-between" : "flex-end"};

  ${Link}, ${Button} {
    width: 1.25rem;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

const NavigationBar = ({ hasMoreLegends = false, onShowMobileLegendList }) => (
  <Nav hasMoreLegends={hasMoreLegends}>
    {hasMoreLegends ? (
      <Button
        data-testid="show-legend-selector"
        onClick={onShowMobileLegendList}
      >
        <ListIcon color="white" />
      </Button>
    ) : null}
    <Link data-testid="player-search-link_mobile" to="/">
      <SearchIcon color="white" />
    </Link>
  </Nav>
);

NavigationBar.propTypes = {
  hasMoreLegends: PropTypes.bool.isRequired,
  onShowMobileLegendList: PropTypes.func.isRequired
};

export default NavigationBar;
