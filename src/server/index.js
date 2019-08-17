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
  // playground: process.env.NODE_ENV !== 'production',
  resolvers,
  typeDefs
});

const app = express();

app.use(helmet());
server.applyMiddleware({ app });

if (process.env.NODE_ENV === "production") {
  const staticFileOptions = {
    dotfiles: "ignore",
    etag: false,
    index: false,
    maxAge: "1d",
    redirect: false,
    setHeaders: res => res.set("x-timestamp", Date.now())
  };

  app.use(express.static("public", staticFileOptions));
}

const port = process.env.PORT || 4000;
app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);

app.get("/*", (req, res) => {
  const file = req.url === "/" ? "/public/index.html" : req.url;

  res.sendFile(path.join(__dirname, file));
});
