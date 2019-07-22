import { styled } from "linaria/react";

const Button = styled.button`
  outline: none;
  border: none;
  background: none;
  cursor: pointer;

  &:disabled {
    cursor: auto;
    background-color: var(--color-disabled);
  }
`;

Button.defaultProps = {
  type: "button"
};

export default Button;
