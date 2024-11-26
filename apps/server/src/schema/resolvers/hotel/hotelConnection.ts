import { Hotel, HotelConnection, SortInput } from "../../types";

export const createHotelConnection = (
  hotels: Hotel[],
  sort?: SortInput,
  first?: number,
  after?: string
): HotelConnection => {
  console.log("[HotelConnection] Creating hotel connection with parameters:", {
    sort,
    first,
    after,
  });
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
  const startIndex = after ? hotels.findIndex((h) => h.code === after) + 1 : 0;
  const endIndex = startIndex + (first || 10);

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
