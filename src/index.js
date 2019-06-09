import { render } from "lit-html";
import PlayerDetails from './views/player-details'

document.addEventListener("DOMContentLoaded", () => {
  render(PlayerDetails, document.body);
});
