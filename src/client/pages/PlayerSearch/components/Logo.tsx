import * as React from "react";
import { styled } from "linaria/react";
import logo from "../../../images/legend-alert-logo.svg";

const StyledDiv = styled.div`
  display: block;
  width: 14.25rem;
  height: 13rem;
  margin: 0 auto 2rem;

  img {
    height: 100%;
  }
`;

const Logo = () => (
  <StyledDiv>
    <img
      alt="Legend Alert Logo | Siren by Mohamad Arif Prasetyo from the Noun Project"
      src={logo}
    />
  </StyledDiv>
);

export default Logo;
