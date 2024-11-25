import { MutationResolvers } from "../types"; // Importa los tipos generados

export const mutationResolver: MutationResolvers = {
  addBook: async (_, { author, title }) => {
    // Simulamos la lógica para agregar un libro
    const newBook = {
      author,
      title,
    };
    return newBook;
  },
};
