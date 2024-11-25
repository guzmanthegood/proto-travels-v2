import { QueryResolvers, SortField, SortOrder } from "../../../schema/types";
import { createHotelConnection } from "./createHotelConnection";
import { parseAvailabilityParams } from "./parseAvailabilityParams";

import hotels from "./hotels";

export const availability: QueryResolvers["availability"] = async (
  _,
  { params }
) => {
  const first: number = params?.first ?? 10;
  const parsedParams = parseAvailabilityParams(params);

  const hotelsConnection = createHotelConnection(hotels, {
    first,
    after: params?.after,
  });

  return {
    id: "search-123",
    params: parsedParams,
    responseTime: {
      total: 500,
      provider: 300,
    },
    hotelsConnection,
  };
};
