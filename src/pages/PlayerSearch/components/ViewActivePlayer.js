import React from "react";
import { Link } from "../../../components";

import { viewActivePlayerContainer } from "../styles";

const ViewActivePlayer = ({ player }) => (
  <div className={viewActivePlayerContainer}>
    <Link to="/stats">
      <h3>View stats for {player.platformUserHandle}?</h3>
    </Link>
  </div>
);

export default ViewActivePlayer;
