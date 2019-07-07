import { styled } from "linaria/react";

const DetailsSlider = styled.div`
  display: flex;
  overflow: hidden;

  .slider {
    display: flex;
    flex: none;
    width: 200%;
    transition: transform 750ms ease-in-out;
    transform: ${({ showResults }) =>
      `translate3d(${showResults ? "-50%" : 0}, 0, 0)`};
  }

  .pane {
    width: 50%;
  }
`;

export default DetailsSlider;
