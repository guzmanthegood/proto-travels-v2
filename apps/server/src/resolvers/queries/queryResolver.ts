import { QueryResolvers } from "../../schema/types";
import { availability } from "./availabilty/query";

export const queryResolver: QueryResolvers = {
  availability,
};
