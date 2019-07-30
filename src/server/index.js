const { ApolloServer } = require("apollo-server");
const dotenv = require("dotenv");

const TrackerNetworkAPI = require("./TrackerNetworkAPI");
const typeDefs = require("./schema");

dotenv.config();

const resolvers = {
  Query: {
    playerStats: async (_source, { filter }, { dataSources }) => {
      return dataSources.trackerNetworkAPI.playerStats(filter);
    },
    searchPlayers: async (_source, { filter }, { dataSources }) => {
      return dataSources.trackerNetworkAPI.searchPlayers(filter);
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
