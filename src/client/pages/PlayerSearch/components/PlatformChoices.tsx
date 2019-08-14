import * as React from "react";
import { platformChoices as container } from "../styles";
import palette from "../../../styles/theme";
import Button from "../../../primitives/Button";
import { PSIcon, XboxIcon, KeyboardIcon } from "../../../ui-icons";

interface PlatformChoicesProps {
  onPlatformOptionSelected: React.Dispatch<React.SetStateAction<string>>;
  platformChoice: string;
}

const PlatformChoices: React.FunctionComponent<PlatformChoicesProps> = ({
  onPlatformOptionSelected,
  platformChoice
}): JSX.Element => (
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

export default React.memo(PlatformChoices);
