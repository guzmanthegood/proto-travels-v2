import {
  Hotel,
  HotelConnection,
  HotelEdge,
  PageInfo,
} from "../../../schema/types";

type ConnectionParams = {
  first?: number;
  after?: string | null;
};

/**
 * Create a new hotel connection.
 * Handles pagination and ensures a valid connection even with an empty hotel list.
 * @param hotels - List of hotels to paginate.
 * @param params - Pagination parameters (first, after).
 * @returns A valid HotelConnection object.
 */
export function createHotelConnection(
  hotels: Hotel[],
  { first = 10, after }: ConnectionParams
): HotelConnection {
  if (!hotels || hotels.length === 0) {
    // Return an empty connection if the hotel list is empty
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

  // Find the index of the hotel matching the cursor "after"
  const offset = after
    ? hotels.findIndex((hotel) => hotel.code === after) + 1
    : 0;

  // Slice the array of hotels to apply pagination
  const paginatedHotels = hotels.slice(offset, offset + first);

  // Create edges with a unique cursor for each hotel
  const edges: HotelEdge[] = paginatedHotels.map((hotel, index) => ({
    cursor: hotel.code,
    node: hotel,
  }));

  // Calculate the total number of hotels before pagination
  const totalCount = hotels.length;

  const pageInfo: PageInfo = {
    hasNextPage: offset + first < totalCount,
    hasPreviousPage: offset > 0,
    startCursor: edges.length > 0 ? edges[0].cursor : null,
    endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
  };

  return {
    totalCount,
    edges,
    pageInfo,
  };
}
