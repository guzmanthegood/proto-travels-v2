// Importar resolvers desde los módulos
import { queryResolver } from "./queryResolver";
import { mutationResolver } from "./mutationResolver";

export const resolvers = {
  Query: { ...queryResolver },
  Mutation: { ...mutationResolver },
};
