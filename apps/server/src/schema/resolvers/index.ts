// resolvers/index.ts
// Centraliza los resolvers para queries, mutations y tipos personalizados

import { queryResolvers } from "./queries"; // Resolvers para las queries
import { mutationResolvers } from "./mutations"; // Resolvers para las mutations
import { Hotel } from "./hotel/hotel"; // Resolvers específicos para el tipo Hotel
import { HotelConnection } from "./hotel/hotelConnection"; // Resolvers para HotelConnection

export const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Hotel, // Resolver para el tipo Hotel
  HotelConnection, // Resolver para la conexión de hoteles
};

console.log("[Resolvers] All resolvers initialized");
