import React from "react";
import PropTypes from "prop-types";

const SearchIcon = ({ color = "#1D1D1D", ...props }) => (
  <svg viewBox="0 0 18 18" {...props}>
    <path
      d="M17.71 16.29l-5.11-5.11a7 7 0 1 0-1.42 1.42l5.11 5.11a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM2 7a5 5 0 1 1 10 0A5 5 0 0 1 2 7z"
      fill={color}
      fillRule="nonzero"
    />
  </svg>
);

SearchIcon.propTypes = {
  color: PropTypes.string
};

export default SearchIcon;
