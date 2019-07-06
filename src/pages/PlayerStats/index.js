import { html, render } from "lit-html";

import * as utils from "./utils";
import * as templates from "./templates";

class PlayerStats extends HTMLElement {
  constructor() {
    super();

    this.state = {
      activeLegend: undefined,
      activePlayer: undefined,
      fetchState: { data: undefined, error: undefined, loading: false }
    };
  }

  async fetchPlayerStats(platformSlug, platformUserHandle) {
    this.setState({
      fetchState: {
        ...this.state.fetchState,
        loading: true
      }
    });

    this._render();

    const { data } = await fetch(
      `/apex-api/v1/apex/standard/profile/${platformSlug}/${platformUserHandle}`,
      {
        credentials: "omit",
        headers: {
          "TRN-Api-Key": TRN_TOKEN
        },
        mode: "cors"
      }
    )
      .catch(err =>
        this.setState({
          fetchState: { ...this.state.fetchState, error: err.message }
        })
      )
      .then(res => {
        if (!res.ok) {
          this.setState({
            fetchState: {
              ...this.state.fetchState,
              error: "Something went wrong"
            }
          });
        }

        return res.json();
      });

    this.setState({
      activeLegend: utils.getActiveLegend(data.children),
      fetchState: {
        data,
        error: undefined,
        loading: false
      }
    });

    return this._render();
  }

  connectedCallback() {
    if (this.isConnected) {
      document.body.classList.add("dark");

      this.setState({ activePlayer: this.activePlayer });

      const {
        activePlayer: { platformSlug, platformUserHandle }
      } = this.state;

      return this.fetchPlayerStats(platformSlug, platformUserHandle);
    }
  }

  // using sync updates to avoid added complexity of async state updates causing renders
  setState(newState) {
    return (this.state = {
      ...this.state,
      ...newState
    });
  }

  _render() {
    const {
      activeLegend,
      activePlayer,
      fetchState: { error, loading }
    } = this.state;

    if (loading) return console.info("loading");

    if (error) return console.warn("something went wrong");

    const activeLegendIconImage = utils.getLegendIconImage(activeLegend);

    return render(
      html`
        ${templates.heroSection({
          image: activeLegendIconImage,
          playerHandle: activePlayer.platformUserHandle,
          playerPlatform: activePlayer.platformSlug
        })}
        ${templates.statsGrid({ stats: activeLegend.stats })}
      `,
      document.querySelector("player-stats-view")
    );
  }
}

customElements.define("player-stats-view", PlayerStats);

export default PlayerStats;
