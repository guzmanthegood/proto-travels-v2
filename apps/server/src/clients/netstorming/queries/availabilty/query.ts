import netstormingClient from "../../netstormingClient";
import { generateAvailabilityRequest } from "./request";
import { AvailabilityParamsInput, Hotel } from "../../../../schema/types";
import { parseResponse } from "./parseResponse";

/**
 * Calls Netstorming's availability API and returns a list of hotels.
 * @param params - Parameters for the availability query.
 * @returns A promise resolving to a list of hotels (Hotel[]), which could be empty.
 */
export const availability = async (
  params: AvailabilityParamsInput
): Promise<Hotel[]> => {
  const xmlRequest = generateAvailabilityRequest(params);

  try {
    // Fetch netstorming availability query
    const response = await netstormingClient.post("/", xmlRequest);

    // Parse the XML response and return the list of hotels
    return await parseResponse(response.data);
  } catch (error: any) {
    const errorMessage = `Netstorming availability error: ${error.message}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};
