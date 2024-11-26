import { hotelInfo } from "../../../services/netstorming/queries/hotelInfo/post";
import { HotelInfo } from "../../types";

export const hotelInfoResolver = async (
  parent: any,
  args: { code: string },
  context: any
): Promise<HotelInfo> => {
  const startTime = Date.now();

  try {
    // Fetch Netstorming hotel info
    const hotelDetails = await hotelInfo(args.code);

    // Return the fetched hotel details
    return hotelDetails;
  } catch (error: any) {
    console.error(
      `[Resolvers] Error fetching hotel info for code: ${args.code}`,
      error
    );
    throw new Error("Failed to fetch hotel info. Please try again later.");
  }
};
