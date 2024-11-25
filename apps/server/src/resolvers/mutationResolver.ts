import { MutationResolvers } from "../types"; // Importa los tipos generados

export const mutationResolver: MutationResolvers = {
  addBook: async (_, { author, title }) => {
    return "perico";
  },
};
