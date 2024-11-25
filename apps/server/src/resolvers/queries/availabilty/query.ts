import { QueryResolvers, SortField, SortOrder } from "../../../schema/types";
import { createHotelConnection } from "./createHotelConnection";
import { parseAvailabilityParams } from "./parseAvailabilityParams";
import { generateUniqueId } from "../../../utils/helpers";

import hotels from "./hotels";

export const availability: QueryResolvers["availability"] = async (
  _,
  { params }
) => {
  const startTime = Date.now(); // Inicio del cálculo del tiempo

  const first: number = params?.first ?? 10;
  const parsedParams = parseAvailabilityParams(params);

  const hotelsConnection = createHotelConnection(hotels, {
    first,
    after: params?.after,
  });

  const endTime = Date.now();
  const totalResponseTime = endTime - startTime;

  return {
    id: generateUniqueId(),
    params: parsedParams,
    responseTime: {
      total: totalResponseTime,
      provider: 0,
    },
    hotelsConnection,
  };
};
