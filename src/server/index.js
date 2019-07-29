const { ApolloServer } = require("apollo-server");
const dotenv = require("dotenv");

const TrackerNetworkAPI = require("./TrackerNetworkAPI");
const schema = require("./schema");

dotenv.config();

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
    },
    playerStats: async (_source, args, { dataSources }) => {
      const {
        filter: { platformSlug, playerUserId }
      } = args;

      return dataSources.trackerNetworkAPI.playerStats({
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
  typeDefs: schema
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
