import * as React from "react";
import { styled } from "linaria/react";
import Button from "../../../primitives/Button";
import PlatformChoices from "./PlatformChoices";

const FormGroup = styled.div`
  padding: 2rem 0 0;
  display: flex;
  flex-direction: column;

  input {
    padding: 1rem 0.5rem;
    border-width: 0 0 2px;
    border-color: var(--color-primary);
    font-size: 1.25rem;
  }
`;

const ConfirmBtn = styled(Button)`
  margin: 3rem 0 0;
  width: 100%;
  height: 4.6875rem;
  background-color: var(--color-primary);
  border-radius: 3px;
  font-size: 2rem;
  color: var(--color-offwhite);
`;

interface ISubmitPlayerSearch {
  (platformChoice: string, playerHandle: string): void;
}

interface PlayerDetailsFormProps {
  networkError?: string;
  searching: boolean;
  submitPlayerSearch: ISubmitPlayerSearch;
}

const PlayerDetailsForm: React.FunctionComponent<PlayerDetailsFormProps> = ({
  networkError,
  searching,
  submitPlayerSearch
}) => {
  const [formValidation, setFormValidation] = React.useState({
    isValid: true,
    msg: ""
  });
  const [platformChoice, setPlatformChoice] = React.useState("");
  const [playerHandle, setPlayerHandle] = React.useState("");

  const onConfirmPlayerSearch = (): void | Promise<void> => {
    if (!platformChoice || !playerHandle) {
      return setFormValidation({
        isValid: false,
        msg: "Please complete the form"
      });
    }

    return submitPlayerSearch(platformChoice, playerHandle);
  };

  return (
    <section>
      <h2>Enter your player details below</h2>
      <form>
        <FormGroup>
          <h3>Which Platform?</h3>
          <PlatformChoices
            onPlatformOptionSelected={setPlatformChoice}
            platformChoice={platformChoice}
          />
        </FormGroup>
        <FormGroup>
          <h3>Player tag</h3>
          <input
            name="player-tag"
            onChange={({ target: { value } }): void => setPlayerHandle(value)}
            placeholder="absolute-legend"
            value={playerHandle}
          />
        </FormGroup>
        {!formValidation.isValid ? (
          <p className="error-msg">{formValidation.msg}</p>
        ) : null}
        <ConfirmBtn
          data-testid="submit-btn"
          disabled={searching}
          onClick={onConfirmPlayerSearch}
        >
          {searching ? "Loading..." : "Confirm"}
        </ConfirmBtn>
        {networkError ? (
          <p className="error-msg text-center">{networkError}</p>
        ) : null}
      </form>
    </section>
  );
};

export default PlayerDetailsForm;
