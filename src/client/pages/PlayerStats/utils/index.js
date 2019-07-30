/**
 * Return the in-game active Legend from TRN stats response
 *
 * @param  {Array} legends Array of stats objects specific to a single Apex Legend
 * @return {Object}        Apex Legend that is currently being used in-game
 */
const getActiveLegend = legends => {
  return legends.find(({ isActiveInGame }) => isActiveInGame);
};

/**
 * Parse the TRN response object to ease access to fields
 *
 * @param  {Array} children Array of TRN legend objects
 * @return {Array}          Simplified representation of a player's legend choices
 */
const getLegendList = ({ segments }) => {
  return segments.map(segment => {
    const stats = Object.values(segment.stats).reduce((_stats, value) => {
      if (!value) return _stats;

      _stats.push({
        categoryName: value.displayCategory,
        displayValue: value.displayValue,
        name: value.displayName
      });

      return _stats;
    }, []);

    return {
      isActiveInGame: segment.metadata.isActive,
      legendName: segment.metadata.name,
      stats,
      tallImageUrl: segment.metadata.tallImageUrl
    };
  });
};

export { getActiveLegend, getLegendList };
