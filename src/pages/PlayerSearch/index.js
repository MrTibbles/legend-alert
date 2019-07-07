import React from "react";

import * as styles from "./styles";
import logo from "../../images/legend-alert-logo.svg";
import * as Components from "./components";

const PlayerSearch = () => {
  return (
    <section className={styles.container}>
      <div className={styles.logo}>
        <img
          alt="Legend Alert Logo | Siren by Mohamad Arif Prasetyo from the Noun Project"
          src={logo}
        />
      </div>
      <h1>Legend Alert</h1>
      <div className={styles.detailsSlider}>
        <div className="slider">
          <Components.PlayerDetailsForm />
        </div>
      </div>
    </section>
  );
};

export default PlayerSearch;
