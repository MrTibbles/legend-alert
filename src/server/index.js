const express = require("express");
const { ApolloServer } = require("apollo-server-express");
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

const app = express();

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
