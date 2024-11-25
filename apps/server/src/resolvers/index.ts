// src/resolvers/index.ts
import queries from "./queries";
import mutations from "./mutations";

export const resolvers = {
  Query: { ...queries },
  Mutation: { ...mutations },
};
