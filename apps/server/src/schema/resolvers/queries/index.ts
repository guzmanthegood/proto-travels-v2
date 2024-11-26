// resolvers/queries/index.ts
// Centraliza todos los resolvers de las queries

import { availabilityResolver } from "./availability";

export const queryResolvers = {
  availability: availabilityResolver,
};

console.log("[Resolvers] Query resolvers loaded");
