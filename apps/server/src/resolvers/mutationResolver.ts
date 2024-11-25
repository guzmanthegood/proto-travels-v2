import { MutationResolvers } from "../types";

export const mutationResolver: MutationResolvers = {
  addBook: async (_, { author, title }) => {
    return "perico";
  },
};
