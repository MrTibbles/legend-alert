/**
 * Return the in-game active Legend from TRN stats response
 *
 * @param  {Array} legends Array of stats objects specific to a single Apex Legend
 * @return {Object}        Apex Legend that is currently being used in-game
 */
const getActiveLegend = legends =>
  legends.find(({ isActiveInGame }) => isActiveInGame);

/**
 * Parse the TRN response object to ease access to fields
 *
 * @param  {Array} children Array of TRN legend objects
 * @return {Array}          Simplified representation of a player's legend choices
 */
const getLegendList = ({ children }) =>
  children.reduce((list, { metadata, stats }) => {
    list.push({
      iconUrl: metadata.icon,
      isActiveInGame: metadata.isActive,
      legendName: metadata.legendName,
      stats,
      tallImageUrl: metadata.tallImageUrl
    });

    return list;
  }, []);

export { getActiveLegend, getLegendList };
