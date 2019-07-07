import "./styles/base.css";
import localforage from "localforage";
import { html, render } from "lit-html";

import * as Pages from "./pages";

localforage.config({
  description: "Apex Legends player stats tracker",
  name: "legend-alert",
  storeName: "players"
});

document.addEventListener("DOMContentLoaded", async () => {
  let activePlayer;

  try {
    activePlayer = await localforage.getItem("activePlayer");
  } catch (err) {
    console.warn("Something went wrong getting the last legend", err);
  }

  return activePlayer
    ? render(
        html`
          <player-stats-view .activePlayer=${activePlayer}></player-stats-view>
        `,
        document.body
      )
    : Pages.PlayerSearch();
});