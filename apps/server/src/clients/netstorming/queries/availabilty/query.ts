import netstormingClient from "../../netstormingClient";
import { generateAvailabilityRequest } from "./request";
import { parseResponse } from "./parseResponse";
import { createConnection } from "../../../../schema/createConnection";

import {
  Hotel,
  AvailabilityParamsInput,
  HotelConnection,
} from "../../../../schema/types";

/**
 * Calls Netstorming's availability API and returns a HotelConnection.
 * @param params - Parameters for the availability query.
 * @returns A promise resolving to a HotelConnection.
 */
export const availability = async (
  params: AvailabilityParamsInput
): Promise<HotelConnection> => {
  const xmlRequest = generateAvailabilityRequest(params);

  try {
    // Fetch netstorming availability query
    const response = await netstormingClient.post("/", xmlRequest);

    // Parse the XML response into hotels
    const hotels = await parseResponse(response.data);

    // Create and return a HotelConnection
    return createHotelConnection(hotels, {
      first: params?.first ?? undefined,
      after: params?.after,
    });
  } catch (error: any) {
    const errorMessage = `Netstorming availability error: ${error.message}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export function createHotelConnection(
  hotels: Hotel[],
  { first = 10, after }: { first?: number; after?: string | null }
): HotelConnection {
  return createConnection({
    items: hotels,
    first,
    after,
    getCursor: (hotel) => hotel.code,
  });
}
