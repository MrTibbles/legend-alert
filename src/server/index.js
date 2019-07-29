const { ApolloServer, gql } = require("apollo-server");
const TrackerNetworkAPI = require("./TrackerNetworkAPI");
const dotenv = require("dotenv");

dotenv.config();

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
  context: () => {
    return {
      token: process.env.TRN_TOKEN
    };
  },
  dataSources: () => {
    return {
      trackerNetworkAPI: new TrackerNetworkAPI()
    };
  },
  resolvers,
  typeDefs
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
