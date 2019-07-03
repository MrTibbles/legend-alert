import { css } from "linaria";
import leftArrow from '../../images/left-arrow.20x36.svg'

const container = css`
  min-height: 100vh;
  padding: 6.25rem 1rem 3.125rem;
  overflow: hidden;

  @media (min-width: 600px) {
    width: 500px;
    margin: 0 auto;
  }
`;

const logo = css`
  display: block;
  width: 14.25rem;
  height: 13rem;
  margin: 0 auto 2rem;

  img {
    height: 100%;
  }
`;

const detailsSlider = css`
  display: flex;
  overflow: hidden;

  .slider {
    display: flex;
    flex: none;
    width: 200%;
    transition: transform 750ms ease-in-out;
    transform: translate3d(0, 0, 0);
  }

  &.show-results .slider {
    transform: translate3d(-50%, 0, 0);
  }

  .pane {
    width: 50%;
  }
`

const backButton = css`
  display: block;
  background: url(${leftArrow}) left center no-repeat;
  background-size: auto 2rem;
  padding-left: 3rem;
  margin-bottom: 1.5rem;
`

const platformChoices = css`
  display: flex;
  justify-content: space-between;

  .platform-opt {
    flex: 1;
    display: flex;
    justify-content: center;
    padding: 0.5rem;
  }

  button {
    display: block;
    width: 100%;
    height: 4rem;
    cursor: pointer;

    &[selected] svg {
      path,
      g {
        fill: var(--color-primary);
      }
    }
  }

  svg {
    display: block;
    height: 100%;
    margin: 0 auto;

    &, & * {
      pointer-events: none;
    }
  }
`;

const formGroup = css`
  padding: 2rem 0 0;
  display: flex;
  flex-direction: column;

  input {
    padding: 1rem 0.5rem;
    border-width: 0 0 2px;
    border-color: var(--color-primary);
    font-size: 1.25rem;
  }
`;

const confirmBtn = css`
  margin: 3rem 0 0;
  width: 100%;
  height: 4.6875rem;
  background-color: var(--color-primary);
  border-radius: 3px;
  font-size: 2rem;
  color: var(--color-magnolia);
`;

const searchResultsContainer = css`
  padding-top: 1rem;
`

const searchResultsList = css`
  list-style: none;
  margin: 1rem 0;

  li {
    display: flex;
    cursor: pointer;
  }
`

export {
  backButton,
  confirmBtn,
  container,
  detailsSlider,
  formGroup,
  logo,
  platformChoices,
  searchResultsContainer,
  searchResultsList
}
