import netstormingClient from "../../client";
import { generateXmlEnvelope } from "../../xmlEnvelope";
import { generateHotelInfoContent } from "./request";
import { parseResponse } from "./parse";

import { HotelInfo } from "../../../../schema/types";

/**
 * Calls Netstorming's hotel info API and returns detailed information about a hotel.
 * @param code - The unique code of the hotel.
 * @returns A promise resolving to a HotelInfo object.
 */
export const hotelInfo = async (code: string): Promise<HotelInfo> => {
  const queryContent = generateHotelInfoContent(code);
  const xmlRequest = generateXmlEnvelope("details", "hotel", queryContent);

  try {
    // Fetch Netstorming hotel info query
    const response = await netstormingClient.post("/", xmlRequest);

    // Parse the XML response into a HotelInfo object
    const hotelInfo = await parseResponse(response.data);

    // Return the HotelInfo object
    return hotelInfo;
  } catch (error: any) {
    const errorMessage = `Netstorming hotel info error: ${error.message}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};
