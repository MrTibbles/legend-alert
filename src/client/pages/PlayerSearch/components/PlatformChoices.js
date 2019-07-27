import React from "react";
import PropTypes from "prop-types";
import { platformChoices as container } from "../styles";
import palette from "../../../styles/theme";
import Button from "../../../primitives/Button";
import { PSIcon, XboxIcon, KeyboardIcon } from "../../../ui-icons";

const PlatformChoices = ({ onPlatformOptionSelected, platformChoice }) => (
  <div className={container}>
    <div className="platform-opt">
      <Button
        data-testid="platform-psn"
        onClick={() => onPlatformOptionSelected("psn")}
      >
        <PSIcon
          color={platformChoice === "psn" ? palette.primary : palette.dark}
        />
      </Button>
    </div>
    <div className="platform-opt">
      <Button
        data-testid="platform-xbl"
        onClick={() => onPlatformOptionSelected("xbl")}
      >
        <XboxIcon
          color={platformChoice === "xbl" ? palette.primary : palette.dark}
        />
      </Button>
    </div>
    <div className="platform-opt">
      <Button
        data-testid="platform-origin"
        onClick={() => onPlatformOptionSelected("origin")}
      >
        <KeyboardIcon
          color={platformChoice === "origin" ? palette.primary : palette.dark}
        />
      </Button>
    </div>
  </div>
);

PlatformChoices.propTypes = {
  onPlatformOptionSelected: PropTypes.func.isRequired,
  platformChoice: PropTypes.string.isRequired
};

export default React.memo(PlatformChoices);
