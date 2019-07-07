import React from "react";
import * as styles from "../styles";
import { KeyboardIcon, PSIcon, XboxIcon } from "../../../components";

const PlayerDetailsForm = () => {
  return (
    <section className="pane">
      <h2>Enter your player details below</h2>
      <form>
        <div className={styles.formGroup}>
          <h3>Which Platform?</h3>
          <div className={styles.platformChoices}>
            <div className="platform-opt">
              <button
                type="button"
                // onClick={onPlatformOptionSelected}
                // data-option="psn"
              >
                <PSIcon />
              </button>
            </div>
            <div className="platform-opt">
              <button
                type="button"
                // onClick={onPlatformOptionSelected}
                // data-option="xbl"
              >
                <XboxIcon />
              </button>
            </div>
            <div className="platform-opt">
              <button
                type="button"
                // onClick={onPlatformOptionSelected}
                // data-option="origin"
              >
                <KeyboardIcon />
              </button>
            </div>
          </div>
          <div className={styles.formGroup}>
            <h3>Player tag</h3>
            <input
              name="player-tag"
              placeholder="absolute-legend"
              // value={''}
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default PlayerDetailsForm;
