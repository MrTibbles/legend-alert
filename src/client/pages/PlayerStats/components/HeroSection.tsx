import * as React from "react";
import { styled } from "linaria/react";

const Container = styled.section`
  height: 60vh;
  background-color: var(--color-dark);
  z-index: var(--depth-layer1);
  padding-top: 75px; /* height of the playerInfo row */
  overflow: hidden;
`;

const PlayerInfo = styled.div`
  display: flex;
  justify-content: center;
  padding: var(--spacing-base) 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 75px;

  @media (min-width: 1024px) {
    left: 25vw;
  }
`;

const PlayerName = styled.h3`
  color: var(--color-white);
  margin: 0;
`;

const LegendImage = styled.div`
  width: auto;
  height: 100%;

  img {
    display: block
    width: 90%;
    max-width: 650px;
    margin: 0 auto;
    transform: translateY(0);

    @media (min-width: 450px) {
      transform: translateY(20px);
    }
  }
`;

interface HeroSectionProps {
  image: string;
  platformUserId: string;
  playerPlatform: string;
}

const HeroSection: React.FunctionComponent<HeroSectionProps> = ({
  image,
  platformUserId,
  playerPlatform
}): JSX.Element => (
  <Container>
    <PlayerInfo>
      <PlayerName data-testid="player-info">
        {platformUserId} | <span className="uppercase">{playerPlatform}</span>
      </PlayerName>
    </PlayerInfo>
    <LegendImage>
      <img
        alt="Active Legend | Legend Alert"
        data-testid="legend-image"
        src={image}
      />
    </LegendImage>
  </Container>
);

export default HeroSection;
