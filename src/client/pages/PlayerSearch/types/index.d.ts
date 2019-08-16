export interface PlayerSearchResponse {
  platformSlug: string;
  platformUserId: string;
}

export interface PlayerSearchQuery extends GraphQLOperation {
  searchPlayers: PlayerSearchResponse[];
}
