import * as React from "react";
import { styled } from "linaria/react";
import palette from "../../../styles/theme";
import Button from "../../../primitives/Button";
import { PSIcon, XboxIcon, KeyboardIcon } from "../../../ui-icons";

const PlatformChoicesContainer = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    display: block;
    width: 100%;
    height: 4rem;
  }

  svg {
    display: block;
    height: 100%;
    margin: 0 auto;

    &,
    & * {
      pointer-events: none;
    }
  }
`;

const PlatformOption = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
`;

interface PlatformChoicesProps {
  onPlatformOptionSelected: React.Dispatch<React.SetStateAction<string>>;
  platformChoice: string;
}

const PlatformChoices: React.FunctionComponent<PlatformChoicesProps> = ({
  onPlatformOptionSelected,
  platformChoice
}): JSX.Element => (
  <PlatformChoicesContainer>
    <PlatformOption>
      <Button
        data-testid="platform-psn"
        onClick={() => onPlatformOptionSelected("psn")}
      >
        <PSIcon
          color={platformChoice === "psn" ? palette.primary : palette.dark}
        />
      </Button>
    </PlatformOption>
    <PlatformOption>
      <Button
        data-testid="platform-xbl"
        onClick={() => onPlatformOptionSelected("xbl")}
      >
        <XboxIcon
          color={platformChoice === "xbl" ? palette.primary : palette.dark}
        />
      </Button>
    </PlatformOption>
    <PlatformOption>
      <Button
        data-testid="platform-origin"
        onClick={() => onPlatformOptionSelected("origin")}
      >
        <KeyboardIcon
          color={platformChoice === "origin" ? palette.primary : palette.dark}
        />
      </Button>
    </PlatformOption>
  </PlatformChoicesContainer>
);

export default React.memo(PlatformChoices);
