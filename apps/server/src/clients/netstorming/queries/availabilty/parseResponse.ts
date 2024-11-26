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
 * Converts them into an AgreementConnection, including the cheapest agreement.
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

  // Find the cheapest agreement by price.amount
  const cheapestAgreement = agreements.reduce((cheapest, current) => {
    return current.price.amount < cheapest.price.amount ? current : cheapest;
  }, agreements[0] || null);

  // Create AgreementConnection using the helper function
  const connection = createConnection({
    items: agreements,
    getCursor: (agreement) => agreement.id,
  });

  // Add the cheapestAgreement to the connection
  return {
    ...connection,
    cheapestAgreement: cheapestAgreement || null, // Handle case when agreements are empty
  };
};
