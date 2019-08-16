import * as React from "react";
import { styled } from "linaria/react";

const DetailsSliderContainer = styled.div`
  display: flex;
  overflow: hidden;

  & > div > * {
    width: 50%;
  }
`;

const Slider = styled.div`
  display: flex;
  flex: none;
  width: 200%;
  transition: transform 750ms ease-in-out;
  transform: ${({ showResults }): string =>
    `translate3d(${showResults ? "-50%" : 0}, 0, 0)`};
`;

interface DetailsSliderProps {
  showResults: boolean;
  children: JSX.Element;
}

const DetailsSlider = ({
  showResults,
  children
}: DetailsSliderProps): JSX.Element => (
  <DetailsSliderContainer>
    <Slider showResults={showResults}>{children}</Slider>
  </DetailsSliderContainer>
);

export default DetailsSlider;
