import './styles/base.css'
import localforage from 'localforage'

import * as Pages from './pages'

localforage.config({
  description: 'Apex Legends player stats tracker',
  name: 'legend-alert'
})

document.addEventListener("DOMContentLoaded", async () => {

  let activeLegend

  try {
    activeLegend = await localforage.getItem('activeLegend')
  } catch (err) {
    console.warn('Something went wrong getting the last legend', err)
  }

  return activeLegend
    ? Pages.PlayerStats(activeLegend)
    : Pages.PlayerSearch()
});
