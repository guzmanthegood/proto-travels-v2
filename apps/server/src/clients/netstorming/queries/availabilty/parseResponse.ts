import { parseStringPromise } from "xml2js";
import { Hotel } from "../../../../schema/types";

/**
 * Parses the XML response from Netstorming into a list of hotels.
 * @param xmlResponse - The raw XML response from Netstorming.
 * @returns A promise resolving to a list of hotels.
 */
export const parseResponse = async (xmlResponse: string): Promise<Hotel[]> => {
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
