const { gql } = require("apollo-server");

const schema = gql`
  type TRNPlayer {
    platformId: Int
    platformSlug: String
    platformUserIdentifier: String
    platformUserId: String
    platformUserHandle: String
    avatarUrl: String
    additionalParameters: String
  }

  input SearchPlayersInput {
    playerUserId: String!
    platformSlug: String!
  }

  type StatDataItem {
    rank: Int
    percentile: Float
    displayName: String!
    displayCategory: String
    value: Float
    displayValue: String!
  }

  type Metadata {
    name: String
    imageUrl: String
    tallImageUrl: String
    isActive: Boolean
  }

  type StatGroup {
    level: StatDataItem
    kills: StatDataItem
    damage: StatDataItem
    headshots: StatDataItem
    timesPlacedtop3: StatDataItem
    seasonWins: StatDataItem
    season2Wins: StatDataItem
    rankScore: StatDataItem
  }

  type Segment {
    type: String!
    metadata: Metadata
    stats: StatGroup
  }

  type PlayerStats {
    segments: [Segment]
  }

  input PlayerStatsInput {
    playerUserId: String!
    platformSlug: String!
    segmentsFilter: String
  }

  type Query {
    searchPlayers(filter: SearchPlayersInput!): [TRNPlayer]
    playerStats(filter: PlayerStatsInput!): PlayerStats
  }
`;

module.exports = schema;
