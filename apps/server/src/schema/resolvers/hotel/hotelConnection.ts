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

  // Sort logic
  let sortedHotels = [...hotels];
  if (sort) {
    sortedHotels.sort((a, b) => {
      const isAscending = sort.order === "ASC";
      let comparison = 0;

      switch (sort.field) {
        case "NAME":
          comparison = a.name.localeCompare(b.name); // Compare names alphabetically
          break;

        case "PRICE":
          const priceA =
            a.cheapestOption?.price?.amount || Number.MAX_SAFE_INTEGER;
          const priceB =
            b.cheapestOption?.price?.amount || Number.MAX_SAFE_INTEGER;
          comparison = priceA - priceB; // Compare prices numerically
          break;

        default:
          break;
      }

      return isAscending ? comparison : -comparison;
    });
  }

  // Pagination logic
  const startIndex = after
    ? sortedHotels.findIndex((h) => h.code === after) + 1
    : 0;
  const endIndex = startIndex + (first || 10);

  const paginatedHotels = sortedHotels.slice(startIndex, endIndex);

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
