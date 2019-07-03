import { html, render } from "lit-html";

function renderPlayerStatsView({
  activeLegend
}) {

  return render(
    html`<p>${activeLegend.platformUserHandle} Stats</p>`,
    document.body
  )
}

const fetchPlayerStats = async (platformSlug, platformUserHandle) => {
  console.info('loading')

  const { data } = await fetch(
    `/apex-api/v1/apex/standard/profile/${platformSlug}/${platformUserHandle}`,
    {
      credentials: 'omit',
      headers: {
        'TRN-Api-Key': TRN_TOKEN,
      },
      mode: 'cors',
  })
  .catch(err => {
    console.warn(err)
  })
  .then(res => {
    if (!res.ok) {
      console.warn('Something went wron')
    }

    return res.json()
  })

  return data
}

const PlayerStats = async activeLegend => {

  const stats = await fetchPlayerStats(
    activeLegend.platformSlug, activeLegend.platformUserHandle
  )

  console.info(stats)

  return renderPlayerStatsView({ activeLegend })
}

export default PlayerStats
