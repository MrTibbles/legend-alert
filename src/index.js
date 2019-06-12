import { render } from "lit-html";
import './styles/base.css'

import PlayerDetails from './pages/PlayerDetails'

document.addEventListener("DOMContentLoaded", () => {
  render(PlayerDetails, document.body);
});
