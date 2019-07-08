import React from "react";

import * as styles from "./styles";
import logo from "../../images/legend-alert-logo.svg";
import { useActivePlayer } from "../../context/ActivePlayer";

import * as Components from "./components";

const PlayerSearch = () => {
  const activePlayer = useActivePlayer();
  const [showResults, toggleShowReults] = React.useState(false);
  const [networkState, setNeworkState] = React.useState({
    data: undefined,
    error: undefined,
    loading: false
  });

  const submitPlayerSearch = async (platformChoice, playerHandle) => {
    setNeworkState({ ...networkState, loading: true });

    const { data } = await fetch(
      `/apex-api/v2/apex/standard/search?platform=${platformChoice}&query=${playerHandle}`,
      {
        credentials: "omit",
        headers: {
          "TRN-Api-Key": TRN_TOKEN
        },
        mode: "cors"
      }
    )
      .catch(err => {
        console.warn(err);

        return setNeworkState({
          ...networkState,
          error: "Something went wrong with that search"
        });
      })
      .then(res => {
        if (!res.ok) {
          console.warn("Something went wrong");

          return setNeworkState({
            ...networkState,
            error: "Something went wrong with that search"
          });
        }

        setNeworkState({ ...networkState, loading: false });

        return res.json();
      });

    if (!data.length) {
      return setNeworkState({
        ...networkState,
        error: "Sorry, no players were found"
      });
    }

    toggleShowReults(true);

    return setNeworkState({ ...networkState, data });
  };

  console.info(activePlayer);

  return (
    <section className={styles.container}>
      <div className={styles.logo}>
        <img
          alt="Legend Alert Logo | Siren by Mohamad Arif Prasetyo from the Noun Project"
          src={logo}
        />
      </div>
      <h1>Legend Alert</h1>
      <Components.DetailsSlider showResults={showResults}>
        <div className="slider">
          <Components.PlayerDetailsForm
            searching={networkState.loading}
            submitPlayerSearch={submitPlayerSearch}
          />
          <Components.PlayerSearchResults
            goBack={toggleShowReults}
            results={networkState.data}
          />
        </div>
      </Components.DetailsSlider>
    </section>
  );
};

export default PlayerSearch;
