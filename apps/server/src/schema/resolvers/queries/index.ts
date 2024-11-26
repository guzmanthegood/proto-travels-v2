// resolvers/queries/index.ts
// Centraliza todos los resolvers de las queries

import { availabilityResolver } from "./availability";
import { hotelInfoResolver } from "./hotelInfo";

export const queryResolvers = {
  availability: availabilityResolver,
  hotelInfo: hotelInfoResolver,
};

console.log("[Resolvers] Query resolvers loaded");
