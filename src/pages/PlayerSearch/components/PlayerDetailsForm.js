import React from "react";
import * as styles from "../styles";
import palette from "../../../styles/theme";
import { KeyboardIcon, PSIcon, XboxIcon } from "../../../components";

/*
  TODOS:
    - Create Button component with default type attribute
 */

const PlayerDetailsForm = () => {
  const [platformChoice, setPlatformChoice] = React.useState("");
  const [playerHandle, setPlayerHandle] = React.useState("");

  const onPlatformOptionSelected = option => setPlatformChoice(option);

  return (
    <section className="pane">
      <h2>Enter your player details below</h2>
      <form>
        <div className={styles.formGroup}>
          <h3>Which Platform?</h3>
          <div className={styles.platformChoices}>
            <div className="platform-opt">
              <button
                onClick={() => onPlatformOptionSelected("psn")}
                type="button"
              >
                <PSIcon
                  color={
                    platformChoice === "psn" ? palette.primary : palette.dark
                  }
                />
              </button>
            </div>
            <div className="platform-opt">
              <button
                onClick={() => onPlatformOptionSelected("xbl")}
                type="button"
              >
                <XboxIcon
                  color={
                    platformChoice === "xbl" ? palette.primary : palette.dark
                  }
                />
              </button>
            </div>
            <div className="platform-opt">
              <button
                onClick={() => onPlatformOptionSelected("origin")}
                type="button"
              >
                <KeyboardIcon
                  color={
                    platformChoice === "origin" ? palette.primary : palette.dark
                  }
                />
              </button>
            </div>
          </div>
          <div className={styles.formGroup}>
            <h3>Player tag</h3>
            <input
              name="player-tag"
              onChange={({ target: { value } }) => setPlayerHandle(value)}
              placeholder="absolute-legend"
              value={playerHandle}
            />
          </div>
        </div>
        <button className={styles.confirmBtn} type="button">
          Confirm
        </button>
      </form>
    </section>
  );
};

export default PlayerDetailsForm;
