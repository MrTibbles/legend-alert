export interface PlayerSearchResult {
  platformSlug: string;
  platformUserId: string;
}

export interface PlayerSearchQuery extends GraphQLOperation {
  searchPlayers: PlayerSearchResult[];
}
