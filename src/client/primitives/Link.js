import { Link } from "react-router-dom";
import { styled } from "linaria/react";

const StyledLink = styled(Link)`
  color: inherit;

  &:active,
  &:visited,
  &:link {
    color: inherit;
  }
`;

export default StyledLink;
