import { html, render } from "lit-html";

function renderPlayerStatsView(playerHandle) {

  return render(
    html`<p>${playerHandle.platformUserHandle} Stats</p>`,
    document.body
  )
}

export default renderPlayerStatsView
