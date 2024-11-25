/**
 * Generates the XML header block for Netstorming requests.
 * @returns A string containing the XML header.
 */
export const getHeader = (): string => {
  return `
    <header>
      <actor>${process.env.NETSTORMING_ACTOR || "defaultActor"}</actor>
      <user>${process.env.NETSTORMING_USER || "defaultUser"}</user>
      <password>${process.env.NETSTORMING_PASSWORD || "defaultPassword"}</password>
      <version>1.6.3</version>
      <timestamp>${new Date().toISOString().replace(/[-:.]/g, "").slice(0, 14)}</timestamp>
    </header>
  `;
};
