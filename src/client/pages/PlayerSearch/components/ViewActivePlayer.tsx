import * as React from "react";
import { styled } from "linaria/react";
import { Link } from "../../../primitives";

const ViewActivePlayerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: var(--color-primary);
  z-index: var(--depth-layer2);
  box-shadow: 0 -10px 30px var(--color-primary);
`;

interface ViewActivePlayerProps {
  playerUserId: string;
}

const ViewActivePlayer: React.FunctionComponent<ViewActivePlayerProps> = ({
  playerUserId
}): JSX.Element => (
  <ViewActivePlayerContainer>
    <Link to="/stats">
      <h3>View stats for {playerUserId}?</h3>
    </Link>
  </ViewActivePlayerContainer>
);

export default ViewActivePlayer;
