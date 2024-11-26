import { parseStringPromise } from "xml2js";
import { HotelInfo } from "../../../../schema/types";

/**
 * Parses the XML response from Netstorming into a HotelInfo object.
 * @param xmlResponse - The raw XML response from Netstorming.
 * @returns A promise resolving to a HotelInfo object.
 */
export const parseResponse = async (
  xmlResponse: string
): Promise<HotelInfo> => {
  try {
    const parsed = await parseStringPromise(xmlResponse, {
      explicitArray: false,
    });

    const response = parsed?.envelope?.response || {};
    const hotel = response || {};

    return {
      code: hotel?.id?.value || "", // Example of mapping, adjust based on XML structure
      name: hotel?.name?.value || "",
    };
  } catch (error: any) {
    const errorMessage = `Error parsing Netstorming hotel info response: ${error.message}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};
