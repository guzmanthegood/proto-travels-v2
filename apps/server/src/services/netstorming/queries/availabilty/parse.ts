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

    // Extract hotels from the response
    const hotelsData = parsed?.envelope?.response?.hotels?.hotel || [];
    const hotelsArray = Array.isArray(hotelsData) ? hotelsData : [hotelsData];

    return hotelsArray.map((hotel: any) => ({
      code: hotel?.$?.code || "",
      name: hotel?.$?.name || "",
      stars: hotel?.$?.stars || null,
      address: hotel?.$?.address || null,
      promo: hotel?.$?.promo === "true",
      city: hotel?.$?.city || null,
    }));
  } catch (error: any) {
    const errorMessage = `Error parsing Netstorming response: ${error.message}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};
