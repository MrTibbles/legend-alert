import { styled } from "linaria/react";

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  transition: transform 250ms ease-out;
  transform: ${({ showLegends }): string =>
    `translateX(${showLegends ? "40vw" : 0})`};

  @media (min-width: 1024px) {
    display: flex;
    transform: translateX(0);
  }
`;

export default Container;
