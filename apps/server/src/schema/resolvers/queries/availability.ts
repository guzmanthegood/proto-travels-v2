// resolvers/queries/availability.ts

import { fetchSearchFromCache } from "../../../services/redis/searchCache";
import { generateUniqueId } from "../../../utils/helpers";
import {
  AvailabilityParams,
  AvailabilityParamsInput,
  AvailabilityResponse,
} from "../../types";
import { createHotelConnection } from "../hotel/hotelConnection";

export const availabilityResolver = async (
  parent: any,
  args: { params: AvailabilityParamsInput },
  context: any
): Promise<AvailabilityResponse> => {
  const startTime = Date.now();

  // Fetch Netstorming availability
  const hotels = await fetchSearchFromCache(args.params);
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
    params: convertToAvailabilityParams(args.params),
    responseTime: {
      total: parseFloat(totalResponseTime),
      provider: parseFloat(prvResponseTime),
    },
    hotelsConnection: hotelsConnection,
  };
};

export const convertToAvailabilityParams = (
  input: AvailabilityParamsInput
): AvailabilityParams => {
  const checkInDate = new Date(input.checkIn);
  const checkOutDate = new Date(input.checkOut);

  // Calculate the number of nights
  const diffInMs = checkOutDate.getTime() - checkInDate.getTime();
  const nights = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  // Map room details to include in the response
  const details = input.details
    ? input.details.map((detail) => ({
        type: detail.type || null,
        required: detail.required,
        occupancy: detail.occupancy,
        extrabed: detail.extrabed || false,
        cot: detail.cot || false,
        age: detail.age || null,
      }))
    : [];

  // Process filters: remove duplicates and sort
  const filters = input.filters ? [...new Set(input.filters)].sort() : [];

  return {
    ...input,
    nights,
    details,
    filters,
  };
};
