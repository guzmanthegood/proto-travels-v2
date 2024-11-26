// resolvers/index.ts
// Aggregates resolvers for queries, mutations, custom types, and scalars

import { queryResolvers } from "./queries";
import { mutationResolvers } from "./mutations";
import { Hotel } from "./hotel/hotel";
import { scalars } from "../scalars";

export const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Hotel,
  ...scalars,
};

console.log("[Resolvers] All resolvers initialized");
