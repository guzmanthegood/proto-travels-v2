import { MutationResolvers } from "../../schema/types";

export const mutationResolver: MutationResolvers = {
  addBook: async (_, { author, title }) => {
    return "perico";
  },
};
