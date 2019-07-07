import React from "react";
import PropTypes from "prop-types";
import { platformChoices as container } from "../styles";
import palette from "../../../styles/theme";
import { PSIcon, XboxIcon, KeyboardIcon } from "../../../components";

const PlatformChoices = ({ onPlatformOptionSelected, platformChoice }) => (
  <div className={container}>
    <div className="platform-opt">
      <button onClick={() => onPlatformOptionSelected("psn")} type="button">
        <PSIcon
          color={platformChoice === "psn" ? palette.primary : palette.dark}
        />
      </button>
    </div>
    <div className="platform-opt">
      <button onClick={() => onPlatformOptionSelected("xbl")} type="button">
        <XboxIcon
          color={platformChoice === "xbl" ? palette.primary : palette.dark}
        />
      </button>
    </div>
    <div className="platform-opt">
      <button onClick={() => onPlatformOptionSelected("origin")} type="button">
        <KeyboardIcon
          color={platformChoice === "origin" ? palette.primary : palette.dark}
        />
      </button>
    </div>
  </div>
);

PlatformChoices.propTypes = {
  onPlatformOptionSelected: PropTypes.func.isRequired,
  platformChoice: PropTypes.string.isRequired
};

export default React.memo(PlatformChoices);
