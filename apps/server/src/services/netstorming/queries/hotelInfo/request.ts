/**
 * Generates the XML content for the Netstorming hotel info query.
 * @param code - The unique code of the hotel.
 * @returns A string containing the specific XML content for the query.
 */
export const generateHotelInfoContent = (code: string): string => {
  return `<hotel id="${code}" />`;
};
