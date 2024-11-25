import { queryResolver } from "./queries/queryResolver";
import { mutationResolver } from "./mutations/mutationResolver";
import DateScalar from "../schema/scalars/date"; // Importa el escalar

export const resolvers = {
  Query: { ...queryResolver },
  Mutation: { ...mutationResolver },
  Date: DateScalar,
};
