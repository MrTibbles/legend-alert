import * as React from "react";
import { styled } from "linaria/react";

interface IconProps {
  color?: string;
}

const SVG = styled.svg`
  transform: ${({ direction }) => (direction === "right" ? "scale(-1)" : "")};
`;

const ArrowIcon = ({ color = "#1D1D1D", ...props }: IconProps) => (
  <SVG viewBox="0 0 20 36" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M17.87 36c.528 0 1.093-.19 1.508-.607.83-.834.83-2.16 0-2.994L5.09 17.993 19.378 3.625c.83-.834.83-2.16 0-2.995A2.12 2.12 0 0 0 16.4.592L.603 16.477C.19 16.894 0 17.424 0 17.993c0 .569.226 1.1.603 1.516L16.4 35.393c.414.417.942.607 1.47.607z"
      fill={color}
      fillRule="nonzero"
    />
  </SVG>
);

export default ArrowIcon;
