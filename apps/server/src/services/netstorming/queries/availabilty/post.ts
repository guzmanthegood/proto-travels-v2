import netstormingClient from "../../client";
import { generateAvailabilityRequest } from "./request";
import { parseResponse } from "./parse";

import { Hotel, AvailabilityParamsInput } from "../../../../schema/types";

/**
 * Calls Netstorming's availability API and returns a HotelConnection.
 * @param params - Parameters for the availability query.
 * @returns A promise resolving to a HotelConnection.
 */
export const availability = async (
  params: AvailabilityParamsInput
): Promise<Hotel[]> => {
  const xmlRequest = generateAvailabilityRequest(params);

  try {
    // Fetch netstorming availability query
    const response = await netstormingClient.post("/", xmlRequest);

    // Parse the XML response into hotels
    let hotels = await parseResponse(response.data);

    // Create and return a HotelConnection
    return hotels;
  } catch (error: any) {
    const errorMessage = `Netstorming availability error: ${error.message}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};
