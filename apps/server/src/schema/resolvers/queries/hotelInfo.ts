import { hotelInfo } from "../../../services/netstorming/queries/hotelInfo/post";
import { HotelInfo } from "../../types";

export const hotelInfoResolver = async (
  parent: any,
  args: { code: string },
  context: any
): Promise<HotelInfo> => {
  const startTime = Date.now();

  console.log("[Resolvers] Fetching hotel info for code:", args.code);

  try {
    // Fetch Netstorming hotel info
    const hotelDetails = await hotelInfo(args.code);

    const endTime = Date.now();
    const responseTime = ((endTime - startTime) / 1000).toFixed(3);

    console.log(
      `[Resolvers] Fetched hotel info for code: ${args.code}, response time: ${responseTime}s`
    );

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
