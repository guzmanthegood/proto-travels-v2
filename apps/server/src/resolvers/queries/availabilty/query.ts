import { QueryResolvers, SortField, SortOrder } from "../../../schema/types";
import { availability as fetchNetstormingAvailability } from "../../../clients/netstorming/queries/queries";
import { createHotelConnection } from "./createHotelConnection";
import { parseAvailabilityParams } from "./parseAvailabilityParams";
import { generateUniqueId } from "../../../utils/helpers";

export const availability: QueryResolvers["availability"] = async (
  _,
  { params }
) => {
  const startTime = Date.now();

  const first: number = params?.first ?? 10;
  const parsedParams = parseAvailabilityParams(params);

  // Fetch hotels from Netstorming
  const hotels = await fetchNetstormingAvailability(params);

  // Create hotel connection
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
