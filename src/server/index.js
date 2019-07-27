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

  input GetPlayerInput {
    playerUserId: String!
    platformSlug: String!
  }

  type Query {
    getPlayer(filter: GetPlayerInput!): TRNPlayer
  }
`;

const resolvers = {
  Query: {
    getPlayer: async (_source, args, { dataSources }) => {
      const {
        filter: { platformSlug, playerUserId }
      } = args;

      console.info({
        platformSlug,
        playerUserId
      });

      return dataSources.trackerNetworkAPI.getPlayer({
        platformSlug,
        playerUserId
      });
    }
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
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

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
