import * as React from "react";
import Button from "../../../primitives/Button";
import * as styles from "../styles";
import PlatformChoices from "./PlatformChoices";

interface ISubmitPlayerSearch {
  (platformChoice: string, playerHandle: string): void
}

interface PlayerDetailsFormProps {
  searching: boolean;
  submitPlayerSearch: ISubmitPlayerSearch
}

const PlayerDetailsForm: React.FunctionComponent<PlayerDetailsFormProps> = ({
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
    <section className="pane">
      <h2>Enter your player details below</h2>
      <form>
        <div className={styles.formGroup}>
          <h3>Which Platform?</h3>
          <PlatformChoices
            onPlatformOptionSelected={setPlatformChoice}
            platformChoice={platformChoice}
          />
          <div className={styles.formGroup}>
            <h3>Player tag</h3>
            <input
              name="player-tag"
              onChange={({ target: { value } }) => setPlayerHandle(value)}
              placeholder="absolute-legend"
              value={playerHandle}
            />
          </div>
          {!formValidation.isValid ? (
            <p className="error-msg">{formValidation.msg}</p>
          ) : null}
        </div>
        <Button
          className={styles.confirmBtn}
          data-testid="submit-btn"
          disabled={searching}
          onClick={onConfirmPlayerSearch}
        >
          {searching ? "Loading..." : "Confirm"}
        </Button>
      </form>
    </section>
  );
};

export default PlayerDetailsForm;
