import { css } from "linaria";

const container = css`
  min-height: 100vh;
  padding: 6.25rem 1rem 3.125rem;

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

  svg {
    width: 100%;
    height: 100%;

    g {
      fill: var(--color-primary);
    }
  }
`;

const platformChoice = css`
  display: flex;
  justify-content: space-between;

  div {
    flex: 1;
    display: flex;
    justify-content: center;
    padding: 0.5rem;

    &.selected svg {
      path,
      g {
        fill: var(--color-primary);
      }
    }
  }

  input {
    display: none;
  }

  label {
    display: block;
    width: 100%;
    height: 4rem;
    cursor: pointer;
  }

  svg {
    display: block;
    height: 100%;
    margin: 0 auto;
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

export {
  container,
  logo,
  platformChoice,
  formGroup,
  confirmBtn,
}
