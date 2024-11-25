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
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <envelope>
      ${getHeader()}

      <query type="availability" product="hotel">

        <!-- Location (longitude, latitude, distance) -->
        ${
          params.search?.coordinates
            ? `
          <longitude value="${params.search.coordinates.longitude}" />
          <latitude value="${params.search.coordinates.latitude}" />
          <distance value="2500" />
        `
            : ""
        }

        <!-- Fixed filters -->
        <filters>
          <filter>BESTARRANGMENT</filter>
        </filters>

        <!-- Dynamic check-in and check-out dates -->
        <checkin date="${params.checkIn}" />
        <checkout date="${params.checkOut}" />

        <details>
            <room  required="1" cot="false" occupancy="2"/>
        </details>
      </query>
    </envelope>
  `;
};
