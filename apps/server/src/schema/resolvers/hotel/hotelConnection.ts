// hotel/createHotelConnection.ts
// Utility to create a HotelConnection from a list of hotels

import { PaginationArgs } from "../pagination";
import { Hotel, HotelConnection } from "../../types";

export const createHotelConnection = (
  hotels: Hotel[],
  args: PaginationArgs
): HotelConnection => {
  // Empty connection logic
  if (hotels.length === 0) {
    return {
      totalCount: 0,
      edges: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: null,
        endCursor: null,
      },
    };
  }

  // Pagination logic
  const startIndex = args.after
    ? hotels.findIndex((h) => h.code === args.after) + 1
    : 0;
  const endIndex = startIndex + (args.first || 10);

  const paginatedHotels = hotels.slice(startIndex, endIndex);

  const edges = paginatedHotels.map((hotel) => ({
    cursor: hotel.code,
    node: hotel,
  }));

  return {
    totalCount: hotels.length,
    edges,
    pageInfo: {
      hasNextPage: endIndex < hotels.length,
      hasPreviousPage: startIndex > 0,
      startCursor: edges[0]?.cursor || null,
      endCursor: edges[edges.length - 1]?.cursor || null,
    },
  };
};
