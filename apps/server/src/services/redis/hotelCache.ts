import redisClient from "./client";
import { hotelInfo } from "../netstorming/queries/queries";

// Cache duration in seconds
const HOTEL_INFO_TTL = Number(process.env.HOTEL_INFO_TTL) || 86400; // default 24 hour

/**
 * Fetch hotel info from Redis hash or Netstorming
 * @param hotelCode - The hotel code to fetch
 * @returns Hotel information
 */
export const fetchHotelInfoFromCache = async (
  hotelCode: string
): Promise<any> => {
  const redisKey = "hotels"; // Hash name
  const redisField = hotelCode; // Field name (hotel code)

  // Check Redis hash for the field
  const cachedData = await redisClient.hget(redisKey, redisField);
  if (cachedData) {
    return JSON.parse(cachedData); // Return cached data
  }

  // Fetch data from Netstorming
  const hotelDetails = await hotelInfo(hotelCode);

  // Cache the result in the hash
  await redisClient.hset(redisKey, redisField, JSON.stringify(hotelDetails));

  // Optional: Set an expiration for the entire hash
  // Redis doesn't support per-field TTL, so this applies to the whole hash
  await redisClient.expire(redisKey, HOTEL_INFO_TTL);

  return hotelDetails;
};
