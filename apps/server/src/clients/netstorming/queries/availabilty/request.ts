/**
 * Generates the XML request for the Netstorming availability query.
 * @param params - Parameters required for the query.
 * @returns A string containing the XML for the availability request.
 */
export const generateAvailabilityRequest = (params: any): string => {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <envelope>
      <header>
        <actor>${process.env.NETSTORMING_ACTOR || "defaultActor"}</actor>
        <user>${process.env.NETSTORMING_USER || "defaultUser"}</user>
        <password>${process.env.NETSTORMING_PASSWORD || "defaultPassword"}</password>
        <timestamp>${new Date().toISOString().replace(/[-:.]/g, "").slice(0, 14)}</timestamp>
      </header>
      <query type="availability" product="hotel">
        <params>
          <checkin>${params.checkIn}</checkin>
          <checkout>${params.checkOut}</checkout>
          <destination>${params.destination}</destination>
          <rooms>${params.rooms}</rooms>
        </params>
      </query>
    </envelope>
  `;
};
