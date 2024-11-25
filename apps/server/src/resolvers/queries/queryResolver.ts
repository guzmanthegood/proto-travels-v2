import { QueryResolvers, SortField, SortOrder } from "../../schema/types";
import { availability } from "./availabilty/query";

export const queryResolver: QueryResolvers = {
  availability,
};
