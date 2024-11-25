import netstormingClient from "../../netstormingClient";
import { generateAvailabilityRequest } from "./request";
import { AvailabilityParamsInput, Hotel } from "../../../../schema/types";
import { parseStringPromise } from "xml2js";

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
    const response = await netstormingClient.post("/", xmlRequest);

    // Parse the XML response and return the list of hotels
    return await parseResponse(response.data);
  } catch (error: any) {
    const errorMessage = `Netstorming availability error: ${error.message}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

/**
 * Parses the XML response from Netstorming into a list of hotels.
 * @param xmlResponse - The raw XML response from Netstorming.
 * @returns A promise resolving to a list of hotels.
 */
const parseResponse = async (xmlResponse: string): Promise<Hotel[]> => {
  try {
    // Parse XML into a JavaScript object
    const parsed = await parseStringPromise(xmlResponse, {
      explicitArray: false,
    });

    // Extract hotels from the response (adjust path based on Netstorming's structure)
    const hotelsData = parsed?.envelope?.response?.hotels?.hotel || [];
    const hotelsArray = Array.isArray(hotelsData) ? hotelsData : [hotelsData];

    // Map the hotelsArray to the GraphQL Hotel type
    return hotelsArray.map((hotel: any) => ({
      code: hotel.code || "",
      name: hotel.name || "",
      location: {
        latitude: parseFloat(hotel.latitude) || 0,
        longitude: parseFloat(hotel.longitude) || 0,
      },
      price: parseFloat(hotel.price) || 0,
    }));
  } catch (error: any) {
    const errorMessage = `Error parsing Netstorming response: ${error.message}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};
