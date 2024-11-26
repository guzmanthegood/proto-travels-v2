import { QueryResolvers } from "../../../schema/types";
import { availability as fetchNetstormingAvailability } from "../../../clients/netstorming/queries/queries";
import { parseAvailabilityParams } from "./parseAvailabilityParams";
import { generateUniqueId } from "../../../utils/helpers";

export const availability: QueryResolvers["availability"] = async (
  _,
  { params }
) => {
  const startTime = Date.now();

  // Validate `SearchInput` contains at least one required field
  const { hotelCode, cityCode, coordinates } = params.search;
  if (!hotelCode && !cityCode && !coordinates) {
    throw new Error(
      "The `search` field must contain at least one of the following: `hotelCode`, `cityCode`, or `coordinates`."
    );
  }

  const parsedParams = parseAvailabilityParams(params);

  // Fetch provider with response time
  const providerStartTime = Date.now();
  const hotelsConnection = await fetchNetstormingAvailability(params);
  const providerEndTime = Date.now();

  // Calculate times in seconds with two decimals
  const providerResponseTime = (
    (providerEndTime - providerStartTime) /
    1000
  ).toFixed(2);
  const endTime = Date.now();
  const totalResponseTime = ((endTime - startTime) / 1000).toFixed(2);

  return {
    id: generateUniqueId(),
    params: parsedParams,
    responseTime: {
      total: parseFloat(totalResponseTime),
      provider: parseFloat(providerResponseTime),
    },
    hotelsConnection,
  };
};
