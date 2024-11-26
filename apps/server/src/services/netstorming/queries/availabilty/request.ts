import { getHeader } from "../../getHeader";
import { AvailabilityParamsInput } from "../../../../schema/types"; // Import types from GraphQL schema

/**
 * Generates the XML request for the Netstorming availability query.
 * @param params - Parameters for the query, typed as AvailabilityParamsInput.
 * @returns A string containing the XML for the availability request.
 */
export const generateAvailabilityRequest = (
  params: AvailabilityParamsInput
): string => {
  // Generate search parameters based on priority: hotel > city > coordinates
  const { hotelCode, cityCode, coordinates } = params.search;
  const searchParams = `
      ${
        hotelCode
          ? `<hotel id="${hotelCode}" />`
          : cityCode
            ? `<city code="${cityCode}" />`
            : coordinates
              ? `
          ${coordinates.latitude ? `<latitude value="${coordinates.latitude}" />` : ""}
          ${coordinates.longitude ? `<longitude value="${coordinates.longitude}" />` : ""}
          ${coordinates.radius ? `<distance value="${coordinates.radius}" />` : ""}
          `
              : `<error>No valid search parameters provided</error>`
      }
    `;

  // Generate the full query content
  return `
    <checkin date="${params.checkIn}" />
    <checkout date="${params.checkOut}" />
    ${searchParams.trim()}
    <filters>
      <filter>BESTARRANGMENT</filter>
    </filters>
    <details>
      <room required="1" cot="false" occupancy="2" />
    </details>
  `.trim();
};
