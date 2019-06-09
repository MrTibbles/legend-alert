import { render } from "lit-html";
import './styles/base.css'

import PlayerDetails from './views/player-details'

document.addEventListener("DOMContentLoaded", () => {
  render(PlayerDetails, document.body);
});
