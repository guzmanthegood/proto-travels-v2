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
    let hotels = await parseResponse(response.data);

    // Sort hotels based on the sort parameter, with a default value if sort is undefined or null
    const sort = params.sort
      ? { field: params.sort.field, order: params.sort.order }
      : { field: "PRICE", order: "ASC" };
    hotels = sortHotels(hotels, sort);

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

/**
 * Sorts an array of hotels based on the provided sorting parameters.
 * @param hotels - Array of hotels to sort.
 * @param sort - Sorting parameters from AvailabilityParamsInput.
 * @returns A sorted array of hotels.
 */
function sortHotels(
  hotels: Hotel[],
  sort: { field: string; order: string } = { field: "PRICE", order: "ASC" }
): Hotel[] {
  const { field, order } = sort;

  return hotels.sort((a, b) => {
    const isAscending = order === "ASC";

    let comparison = 0;

    switch (field) {
      case "PRICE":
        // TODO: get cheapest agreement price
        comparison =
          (a.agreements?.cheapestAgreement?.price.amount || 0) -
          (b.agreements?.cheapestAgreement?.price.amount || 0);
        break;
      case "NAME":
        comparison = a.name.localeCompare(b.name);
        break;
      default:
        break;
    }

    return isAscending ? comparison : -comparison;
  });
}

/**
 * Creates a HotelConnection using the helper function.
 * @param hotels - Array of hotels.
 * @param params - Pagination parameters.
 * @returns A HotelConnection object.
 */
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
