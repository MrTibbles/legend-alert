const { ApolloServer, gql } = require("apollo-server");
const TrackerNetworkAPI = require("./TrackerNetworkAPI");

const typeDefs = gql`
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

  type Query {
    searchPlayers(filter: SearchPlayersInput!): [TRNPlayer]
  }
`;

const resolvers = {
  Query: {
    searchPlayers: async (_source, args, { dataSources }) => {
      const {
        filter: { platformSlug, playerUserId }
      } = args;

      return dataSources.trackerNetworkAPI.searchPlayers({
        platformSlug,
        playerUserId
      });
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      trackerNetworkAPI: new TrackerNetworkAPI()
    };
  },
  context: () => {
    return {
      // REPLACE WITH DOT ENV IMPORT
      token: "b8b9affa-afeb-41dd-ade1-025f9d1f1f77"
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
