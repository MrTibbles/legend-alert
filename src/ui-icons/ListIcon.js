import React from "react";
import PropTypes from "prop-types";

const ListIcon = ({ color = "#1D1D1D" }) => (
  <svg viewBox="0 0 46 46">
    <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
      <g fill={color} fillRule="nonzero">
        <rect height="6" rx="2" width="6" x="0" y="0"></rect>
        <rect height="6" rx="2" width="6" x="0" y="20"></rect>
        <rect height="6" rx="2" width="6" x="0" y="40"></rect>
        <path
          d="M44,1 L12,1 C10.8954305,1 10,1.8954305 10,3 C10,4.1045695 10.8954305,5 12,5 L44,5 C45.1045695,5 46,4.1045695 46,3 C46,1.8954305 45.1045695,1 44,1 Z"
          id="Path"
        ></path>
        <path
          d="M44,21 L12,21 C10.8954305,21 10,21.8954305 10,23 C10,24.1045695 10.8954305,25 12,25 L44,25 C45.1045695,25 46,24.1045695 46,23 C46,21.8954305 45.1045695,21 44,21 Z"
          id="Path"
        ></path>
        <path
          d="M44,41 L12,41 C10.8954305,41 10,41.8954305 10,43 C10,44.1045695 10.8954305,45 12,45 L44,45 C45.1045695,45 46,44.1045695 46,43 C46,41.8954305 45.1045695,41 44,41 Z"
          id="Path"
        ></path>
      </g>
    </g>
  </svg>
);

ListIcon.propTypes = {
  color: PropTypes.string
};

export default ListIcon;
