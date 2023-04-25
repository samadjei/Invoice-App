import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";

const MONGODB =
  "mongodb+srv://samadjei:KAdqeDpHOVBhTGSj@cluster0.czrybrj.mongodb.net/invoice_app_db?retryWrites=true&w=majority";

// Apollo Server
// typeDefs: GraphQL Type Definitions
// resolvers: How do we resolve queries

const server = new ApolloServer({ typeDefs, resolvers });

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(async () => {
    const { url } = await startStandaloneServer(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
      listen: { port: 5002 },
    });
    console.log(`${url}`);
  })
  .catch((error) => console.log(error));
