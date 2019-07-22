import React from "react";
import PropTypes from "prop-types";
import { css } from "linaria";
import Link from "../../../primitives/Link";
import SearchIcon from "../../../ui-icons/SearchIcon";

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
  `,
  searchButton: css`
    position: absolute;
    left: var(--spacing-base);
    width: 1.25rem;
    z-index: var(--depth-layer1);
  `
};

const HeroSection = ({ image, platformUserId, playerPlatform }) => (
  <section className={styles.container}>
    <div className={styles.playerInfo}>
      <Link className={styles.searchButton} to="/">
        <SearchIcon color="white" />
      </Link>
      <h3 className={styles.playerName}>
        {platformUserId} | <span className="uppercase">{playerPlatform}</span>
      </h3>
    </div>
    <div className={styles.legendImage}>
      <img alt="Active Legend | Legend Alert" src={image} />
    </div>
  </section>
);

HeroSection.propTypes = {
  image: PropTypes.string,
  platformUserId: PropTypes.string.isRequired,
  playerPlatform: PropTypes.string.isRequired
};

export default HeroSection;
