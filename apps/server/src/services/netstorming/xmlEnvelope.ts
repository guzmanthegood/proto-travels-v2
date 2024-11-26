import { getHeader } from "./getHeader";

/**
 * Generates the base XML envelope for Netstorming requests.
 * @param type - The type of the query (e.g., "availability", "details").
 * @param product - The product of the query (e.g., "hotel").
 * @param queryContent - The specific query content to include in the request.
 * @returns A string containing the full XML request.
 */
export const generateXmlEnvelope = (
  type: string,
  product: string,
  queryContent: string
): string => {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <envelope>
      ${getHeader()}
      <query type="${type}" product="${product}">
        ${queryContent}
      </query>
    </envelope>
  `.trim();
};
