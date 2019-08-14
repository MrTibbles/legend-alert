import * as React from "react";
import { Link } from "../../../primitives";

import { viewActivePlayerContainer } from "../styles";

interface ViewActivePlayerProps {
  playerUserId: string;
}

const ViewActivePlayer: React.FunctionComponent<
  ViewActivePlayerProps
> = ({ playerUserId }): JSX.Element => (
  <div className={viewActivePlayerContainer}>
    <Link to="/stats">
      <h3>View stats for {playerUserId}?</h3>
    </Link>
  </div>
);

export default ViewActivePlayer;
