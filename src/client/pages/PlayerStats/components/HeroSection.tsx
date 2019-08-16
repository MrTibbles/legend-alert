import * as React from "react";
import { css } from "linaria";

const styles = {
  container: css`
    height: 60vh;
    background-color: var(--color-dark);
    z-index: var(--depth-layer1);
    padding-top: 75px; /* height of the playerInfo row */
    overflow: hidden;
  `,
  legendImage: css`
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
  `,
  playerInfo: css`
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
  `,
  playerName: css`
    color: var(--color-white);
    margin: 0;
  `
};

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
  <section className={styles.container}>
    <div className={styles.playerInfo}>
      <h3 className={styles.playerName} data-testid="player-info">
        {platformUserId} | <span className="uppercase">{playerPlatform}</span>
      </h3>
    </div>
    <div className={styles.legendImage}>
      <img
        alt="Active Legend | Legend Alert"
        data-testid="legend-image"
        src={image}
      />
    </div>
  </section>
);

export default HeroSection;
