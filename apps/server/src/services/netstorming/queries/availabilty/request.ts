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

  // Generate filters XML
  const filtersXml = params.filters
    ? params.filters.map((filter) => `<filter>${filter}</filter>`).join("")
    : "";

  console.log("details >>>>>>>>> ", params.details);

  // Generate room details XML
  const roomDetailsXml = params.details
    ? params.details
        .map((detail) => {
          // Build attributes dynamically
          const attributes = [
            detail.type ? `type="${detail.type}"` : "",
            detail.required !== undefined
              ? `required="${detail.required}"`
              : "", // Use the integer directly
            detail.extrabed !== undefined
              ? `extrabed="${detail.extrabed}"`
              : "", // Boolean as true/false
            detail.age !== undefined ? `age="${detail.age}"` : "",
            detail.cot !== undefined ? `cot="${detail.cot}"` : "", // Boolean as true/false
            detail.occupancy !== undefined
              ? `occupancy="${detail.occupancy}"`
              : "",
          ]
            .filter((attr) => attr !== "") // Remove empty attributes
            .join(" "); // Join attributes into a single string

          // Return the <room> element
          return `<room ${attributes} />`;
        })
        .join("") // Combine all room elements into a single string
    : "";

  // Generate the full query content
  return `
    <checkin date="${params.checkIn}" />
    <checkout date="${params.checkOut}" />
    ${searchParams.trim()}
    <filters>
      ${filtersXml}
    </filters>
    <details>
      ${roomDetailsXml}
    </details>
  `.trim();
};
