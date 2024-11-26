import { HotelInfo } from "../../types";

export const hotelInfoResolver = async (
  parent: any,
  args: { code: string },
  context: any
): Promise<HotelInfo> => {
  console.log("[Resolvers] Fetching hotel info for code:", args.code);

  // Placeholder fetch logic
  // Here we'll fetch the hotel details from the Netstorming service when it's ready.
  // For now, this resolver returns only mandatory fields.

  return {
    code: args.code,
    name: "Placeholder Hotel Name", // Replace with actual name when fetch is implemented.
  };
};
