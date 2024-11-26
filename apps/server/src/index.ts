// src/index.ts
import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import schema from "./schema/schema"; // Importamos el esquema cargado
import { resolvers } from "./schema/resolvers";

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀 Server ready at ${url}`);
};

startServer();
