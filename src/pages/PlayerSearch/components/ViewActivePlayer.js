import React from "react";
import { Link } from "../../../components";

import { viewActivePlayerContainer } from "../styles";

const ViewActivePlayer = ({ playerUserId }) => (
  <div className={viewActivePlayerContainer}>
    <Link to="/stats">
      <h3>View stats for {playerUserId}?</h3>
    </Link>
  </div>
);

export default ViewActivePlayer;
