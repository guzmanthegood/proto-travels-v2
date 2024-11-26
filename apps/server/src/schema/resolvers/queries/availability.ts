// resolvers/queries/availability.ts

import { availability } from "../../../services/netstorming/queries/queries";
import { generateUniqueId } from "../../../utils/helpers";
import { AvailabilityParamsInput, AvailabilityResponse } from "../../types";
import { createHotelConnection } from "../hotel/hotelConnection";

export const availabilityResolver = async (
  parent: any,
  args: { params: AvailabilityParamsInput },
  context: any
): Promise<AvailabilityResponse> => {
  const startTime = Date.now();

  // Fetch Netstorming availability
  const hotels = await availability(args.params);
  const prvEndTime = Date.now();

  // Create new connection with extracted parameters
  const hotelsConnection = createHotelConnection(
    hotels,
    args.params?.sort ?? undefined,
    args.params?.first ?? undefined,
    args.params?.after ?? undefined
  );

  const endTime = Date.now();
  const prvResponseTime = ((prvEndTime - startTime) / 1000).toFixed(3);
  const totalResponseTime = ((endTime - startTime) / 1000).toFixed(3);

  // Availability response
  return {
    id: generateUniqueId(),
    params: args.params,
    responseTime: {
      total: parseFloat(totalResponseTime),
      provider: parseFloat(prvResponseTime),
    },
    hotelsConnection: hotelsConnection,
  };
};
