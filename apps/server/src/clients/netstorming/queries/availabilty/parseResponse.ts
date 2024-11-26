import { parseStringPromise } from "xml2js";
import {
  Hotel,
  Agreement,
  AgreementConnection,
} from "../../../../schema/types";
import { createConnection } from "../../../../schema/createConnection";

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
      agreements: parseAgreements(hotel.agreement),
      additionalData: null,
    }));
  } catch (error: any) {
    const errorMessage = `Error parsing Netstorming response: ${error.message}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

/**
 * Extracts agreements from a raw XML agreement object.
 * Converts them into an AgreementConnection.
 * @param agreementsData - Raw agreements data from the XML.
 * @returns An AgreementConnection object.
 */
const parseAgreements = (agreementsData: any): AgreementConnection => {
  const agreementsArray = Array.isArray(agreementsData)
    ? agreementsData
    : agreementsData
      ? [agreementsData]
      : [];

  const agreements: Agreement[] = agreementsArray.map((agreement: any) => ({
    id: agreement?.$?.id || "",
    roomType: agreement?.$?.room_type || "",
    available: agreement?.$?.available === "true",
    roomBasis: agreement?.$?.room_basis || "",
    mealBasis: agreement?.$?.meal_basis || "",
    ctype: agreement?.$?.ctype || "",
    price: {
      amount: parseFloat(agreement?.$?.total) || 0,
      currency: agreement?.$?.currency || "EUR", // Currency is now a simple string
    },
    isFullyRefundable: agreement?.$?.is_fully_refundable === "true",
  }));

  // Create AgreementConnection using the helper function
  return createConnection({
    items: agreements,
    getCursor: (agreement) => agreement.id,
  });
};

/**
 * Helper function to map currency codes to currency names.
 * This is optional and can be extended to cover more codes.
 * @param code - The currency code (e.g., "EUR").
 * @returns The full name of the currency.
 */
const getCurrencyName = (code: string): string => {
  const currencyNames: Record<string, string> = {
    EUR: "Euro",
    USD: "United States Dollar",
    GBP: "British Pound",
    // Add more currencies as needed
  };

  return currencyNames[code] || "Unknown Currency";
};
