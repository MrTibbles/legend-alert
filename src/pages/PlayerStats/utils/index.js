/**
 * Return the in-game active Legend from TRN stats response
 *
 * @param  {Array} legends Array of stats objects specific to a single Apex Legend
 * @return {Object}        Apex Legend that is currently being used in-game
 */
const getActiveLegend = legends => legends.find(({ metadata }) => metadata.isActive)

/**
 * Return the icon image from the active legend object
 *
 * Shared util approach taken to handle changes in TRN remote schema
 * being easy to handle with a centralised util method
 *
 * @param  {Object} activeLegend Active in-app Legend
 * @return {String}              URL for legend icon image
 */
const getLegendIconImage = ({ metadata }) => metadata.icon

export {
  getActiveLegend,
  getLegendIconImage
}
