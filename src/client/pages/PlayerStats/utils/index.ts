import { Legend, Stat } from "../types";

const getInGameActiveLegend = (legends: Legend[]): Legend => {
  const inGameActiveLegend = legends.find(
    ({ isActiveInGame }) => isActiveInGame
  );

  return inGameActiveLegend ? inGameActiveLegend : legends[0];
};

const getLegendList = ({ segments }): Legend[] => {
  return segments.map(segment => {
    const stats = Object.values(segment.stats).reduce(
      (_stats: Stat[], value: { [key: string]: any }) => {
        if (!value) return _stats;

        const _stat: Stat = {
          categoryName: value.displayCategory,
          displayValue: value.displayValue,
          name: value.displayName
        };

        _stats.push(_stat);

        return _stats;
      },
      []
    );

    return {
      isActiveInGame: segment.metadata.isActive,
      legendName: segment.metadata.name,
      stats,
      tallImageUrl: segment.metadata.tallImageUrl
    };
  });
};

export { getInGameActiveLegend, getLegendList };
