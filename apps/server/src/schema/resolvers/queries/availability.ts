// resolvers/queries/availability.ts
// Resolver for the "availability" query

import { fetchHotelsFromNetstorming } from "../../../services/netstorming/client";
import { AvailabilityParamsInput, AvailabilityResponse } from "../../types";
import { createHotelConnection } from "../hotel/hotelConnection";

export const availabilityResolver = async (
  parent: any,
  args: { params: AvailabilityParamsInput }, // Define the expected input type
  context: any
): Promise<AvailabilityResponse> => {
  console.log("[Resolvers] In availability query resolver, arguments: ", args);

  // Step 1: Fetch hotels from Netstorming
  const hotels = await fetchHotelsFromNetstorming(args.params.search);
  console.log("[Resolvers] Fetched hotels from Netstorming:", hotels.length);

  // Step 2: Use createHotelConnection to generate a connection
  const hotelsConnection = createHotelConnection(hotels, {
    first: 10,
    after: undefined, // Passing undefined instead of null
    sort: { field: "PRICE", order: "DESC" },
  });

  // Step 2: Return AvailabilityResponse with hotels (to be resolved later)
  return {
    id: "availability-id", // Generate a unique ID
    params: args.params, // Pass search parameters
    responseTime: { total: 0, provider: 0 }, // Mock timing info
    hotelsConnection: hotelsConnection, // Pass hotels for HotelConnection resolver
  };
};
