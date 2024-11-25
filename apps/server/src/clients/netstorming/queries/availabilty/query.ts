import netstormingClient from "../../netstormingClient";
import { generateAvailabilityRequest } from "./request";

/**
 * Calls Netstorming's availability API and returns the response.
 * @param params - Parameters for the availability query.
 * @returns A promise resolving to the parsed response from Netstorming.
 */
export const availability = async (params: any): Promise<any> => {
  const xmlRequest = generateAvailabilityRequest(params);

  try {
    const response = await netstormingClient.post("/", xmlRequest);
    return parseResponse(response.data); // Implement your XML parsing logic here
  } catch (error: any) {
    console.error("Error in Netstorming availability call:", error.message);
    throw new Error("Failed to fetch availability from Netstorming");
  }
};

/**
 * Parses the XML response from Netstorming into a usable format.
 * @param xmlResponse - The raw XML response.
 * @returns Parsed data.
 */
const parseResponse = (xmlResponse: string): any => {
  // TODO: Implement XML parsing logic (e.g., xml2js or manual parsing)
  return {}; // Placeholder
};
