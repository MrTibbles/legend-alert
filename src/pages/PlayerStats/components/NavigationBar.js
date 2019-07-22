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
`;

const NavigationBar = ({ hasMoreLegends = false }) => (
  <Nav hasMoreLegends={hasMoreLegends}>
    {hasMoreLegends ? (
      <Button>
        <ListIcon color="white" />
      </Button>
    ) : null}
    <Link to="/">
      <SearchIcon color="white" />
    </Link>
  </Nav>
);

NavigationBar.propTypes = {
  hasMoreLegends: PropTypes.bool.isRequired
};

export default NavigationBar;
