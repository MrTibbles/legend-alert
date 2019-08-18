const path = require("path");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const dotenv = require("dotenv");
const helmet = require("helmet");

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
  playground: process.env.NODE_ENV !== "production",
  resolvers,
  typeDefs
});

const app = express();

app.use(helmet());
server.applyMiddleware({ app });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("public"));
}

const port = process.env.PORT || 4000;
app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);

app.get("*", (req, res) => {
  const filepath = !req.url.includes(".")
    ? "/public/index.html"
    : req.url.split("?")[0]; // removes ?__WB_REVISION__=* suffix

  res.sendFile(path.join(__dirname, filepath));
});
