import redisClient from "./client";
import { availability } from "../netstorming/queries/queries";

// Cache duration in seconds
const AVAILABILITY_TTL = Number(process.env.AVAILABILITY_TTL) || 300; // Default: 5 minutes

/**
 * Generate a compact Redis key for availability based on search params
 * @param params - Availability search parameters
 * @returns A compact Redis key
 */
const generateSearchKey = (params: Record<string, any>): string => {
  // Helper to format dates to YYYYMMDD
  const formatDate = (date: string | Date): string => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  // Extract essential parts of the parameters
  const checkIn = formatDate(params.checkIn);
  const checkOut = formatDate(params.checkOut);
  const cityCode = params.search?.cityCode || "";
  const filters = params.filters
    ? [...new Set(params.filters)].sort().join("")
    : "";

  // Process room distribution into a compact string
  const roomDistribution = params.details
    ? params.details
        .map(
          (detail: any) =>
            `${detail.type || ""}${detail.required}${detail.occupancy}${detail.extrabed || 0}${detail.cot || 0}${detail.age || ""}`
        )
        .join("_")
    : "";

  // Concatenate all parts
  return `${checkIn}${checkOut}${cityCode}${filters}${roomDistribution}`;
};

/**
 * Fetch availability from Redis cache or Netstorming
 * @param params - Availability search parameters
 * @returns A list of available hotels
 */
export const fetchSearchFromCache = async (params: any): Promise<any> => {
  const redisKey = "search"; // Hash name
  const redisField = generateSearchKey(params); // Unique field within the hash

  // Check Redis hash for the field
  const cachedData = await redisClient.hget(redisKey, redisField);
  if (cachedData) {
    return JSON.parse(cachedData); // Return cached data
  }

  // Fetch availability data from Netstorming
  const availabilityData = await availability(params);

  // Cache the result in the hash
  await redisClient.hset(
    redisKey,
    redisField,
    JSON.stringify(availabilityData)
  );

  // Set expiration for the entire hash
  const expireResult = await redisClient.expire(redisKey, AVAILABILITY_TTL);
  if (!expireResult) {
    console.warn(`[Redis] Failed to set expiration for key: ${redisKey}`);
  }

  return availabilityData;
};
