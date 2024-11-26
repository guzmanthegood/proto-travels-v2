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

  // Step 2: Extract pagination and sorting parameters from args.params
  const { first, after, sort } = args.params;

  // Step 3: Use createHotelConnection to generate a connection with extracted parameters
  const hotelsConnection = createHotelConnection(
    hotels,
    args.params?.sort ?? undefined,
    args.params?.first ?? undefined,
    args.params?.after ?? undefined
  );

  // Step 4: Return AvailabilityResponse with the hotel connection
  return {
    id: "availability-id", // Generate a unique ID
    params: args.params, // Pass search parameters
    responseTime: { total: 0, provider: 0 }, // Mock timing info
    hotelsConnection: hotelsConnection, // Pass the hotel connection
  };
};
