export interface Stat {
  categoryName: string;
  displayValue: string;
  name: string;
}

export interface Legend {
  isActiveInGame: boolean;
  legendName: string;
  stats: Stat[];
  tallImageUrl: string;
}

interface PlayerStatsMetadata {
  name: string;
  imageUrl: string;
  tallImageUrl: string;
  isActive: boolean;
}

interface PlayerStatsByType {
  level: Stat[];
  kills: Stat[];
  damage: Stat[];
  headshots: Stat[];
  timesPlacedtop3: Stat[];
  seasonWins: Stat[];
  season2Wins: Stat[];
  rankScore: Stat[];
}

interface PlayerStatsSegment {
  type: string;
  metadata: PlayerStatsMetadata;
  stats: PlayerStatsByType;
}

interface PlayerStatsResponse {
  segments: PlayerStatsSegment[];
}

export interface PlayerStatsQuery extends GraphQLOperation {
  playerStats: PlayerStatsResponse;
}
