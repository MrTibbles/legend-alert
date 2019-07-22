import React from "react";
import { styled } from "linaria/react";

const Container = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background: red;
  width: 25vw;
  min-height: 100vh;
  height: 100%;
  transform: translateX(-25vw);

  @media (min-width: 1024px) {
    transform: translateX(0);
    position: unset;
  }
`;

const LegendSelector = () => <Container />;

export default LegendSelector;
