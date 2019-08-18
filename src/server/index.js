const { ApolloServer: ApolloMicro } = require("apollo-server-micro");
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

const production = process.env.NODE_ENV === "production";

const _Server = production ? ApolloMicro : ApolloServer;

const server = new _Server({
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
  playground: process.env.NODE_ENV !== "production",
  resolvers,
  typeDefs
});

const handler = production
  ? server.createHandler({ path: "/graphql" })
  : server.listen().then(({ url }) => console.log(`GraphQL server on ${url}`));

module.exports = handler;
