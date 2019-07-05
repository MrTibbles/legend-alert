import { html, render } from "lit-html";

import * as utils from "./utils";
import * as templates from "./templates";

function renderPlayerStatsView({ activeLegend, activePlayer }) {
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
    document.body
  );
}

const fetchPlayerStats = async (platformSlug, platformUserHandle) => {
  console.info("loading");

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
    .catch(err => {
      console.warn(err);
    })
    .then(res => {
      if (!res.ok) {
        console.warn("Something went wrong");
      }

      return res.json();
    });

  return data;
};

const PlayerStats = async activePlayer => {
  document.body.classList.add("dark");

  const stats = await fetchPlayerStats(
    activePlayer.platformSlug,
    activePlayer.platformUserHandle
  );

  const activeLegend = utils.getActiveLegend(stats.children);

  return renderPlayerStatsView({ activeLegend, activePlayer });
};

export default PlayerStats;