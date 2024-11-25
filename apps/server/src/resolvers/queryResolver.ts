import { QueryResolvers } from "../types"; // Importa los tipos generados

export const queryResolver: QueryResolvers = {
  availability: async () => {
    // Simulamos la respuesta para la query "availability"
    return "Available"; // Simplemente devolvemos un String en este caso
  },
  books: async () => {
    // Simulamos la respuesta para la query "books"
    return [
      { title: "Book 1", author: "Author 1" },
      { title: "Book 2", author: "Author 2" },
    ]; // Devolvemos un array de libros
  },
};
