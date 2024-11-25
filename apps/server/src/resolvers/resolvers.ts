import { queryResolver } from "./queries/queryResolver";
import { mutationResolver } from "./mutations/mutationResolver";

export const resolvers = {
  Query: { ...queryResolver },
  Mutation: { ...mutationResolver },
};
