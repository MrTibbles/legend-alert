import React from "react";
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
      width: 100%;
      max-width: 650px;
      margin: 0 auto;
      transform: translateY(0);

      @media (min-width: 450px) {
        transform: translateY(-45px);
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
  `,
  playerName: css`
    color: var(--color-white);
    margin: 0;
  `
};

const HeroSection = ({ image, playerHandle, playerPlatform }) => (
  <section className={styles.container}>
    <div className={styles.playerInfo}>
      <h3 className={styles.playerName}>
        {playerHandle} | <span className="uppercase">{playerPlatform}</span>
      </h3>
    </div>
    <div className={styles.legendImage}>
      <img alt="Active Legend | Legend Alert" src={image} />
    </div>
  </section>
);

export default HeroSection;