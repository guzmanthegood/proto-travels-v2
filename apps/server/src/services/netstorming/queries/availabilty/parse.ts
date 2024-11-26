import { parseStringPromise } from "xml2js";
import { Hotel, Option } from "../../../../schema/types";

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

    return hotelsArray.map((hotel: any) => {
      const options = parseOptions(hotel.agreement || []);
      return {
        code: hotel?.$?.code || "",
        name: hotel?.$?.name || "",
        stars: hotel?.$?.stars || null,
        address: hotel?.$?.address || null,
        promo: hotel?.$?.promo === "true",
        city: hotel?.$?.city || null,
        options: options,
        totalOptions: options.length, // Count total options
      };
    });
  } catch (error: any) {
    const errorMessage = `Error parsing Netstorming response: ${error.message}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

/**
 * Parses a list of agreements into a list of options.
 * @param agreementsData - Raw agreement data from the XML.
 * @returns A list of parsed and sorted options.
 */
const parseOptions = (agreementsData: any): Option[] => {
  const agreementsArray = Array.isArray(agreementsData)
    ? agreementsData
    : [agreementsData];

  // Parse and sort options by price (ascending order)
  return agreementsArray
    .map((agreement: any) => ({
      id: agreement?.$?.id || "",
      roomType: agreement?.$?.room_type || "",
      available: agreement?.$?.available === "true",
      roomBasis: agreement?.$?.room_basis || "",
      mealBasis: agreement?.$?.meal_basis || "",
      ctype: agreement?.$?.ctype || "",
      price: {
        amount: parseFloat(agreement?.$?.total || "0"),
        currency: agreement?.$?.currency || "EUR",
      },
      isFullyRefundable: agreement?.$?.is_fully_refundable === "true",
    }))
    .sort((a, b) => a.price.amount - b.price.amount); // Sort options by price
};
