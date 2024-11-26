// resolvers/hotel/hotel.ts

import { hotelInfo } from "../../../services/netstorming/queries/queries";

export const Hotel = {
  hotelInfo: async (parent: any) => {
    if (!parent.code) {
      console.warn("[Resolvers] Missing hotel code for fetching hotelInfo");
      return null;
    }

    try {
      // Fetch hotel info for the current hotel
      const hotelDetails = await hotelInfo(parent.code);
      return hotelDetails;
    } catch (error: any) {
      console.error(
        `[Resolvers] Failed to fetch hotelInfo for code ${parent.code}:`,
        error.message
      );
      return null;
    }
  },
};

console.log("[Resolvers] Hotel type resolvers loaded");
