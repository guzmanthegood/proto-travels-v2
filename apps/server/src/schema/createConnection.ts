import { PageInfo } from "./types";

type ConnectionParams<T> = {
  items: T[];
  first?: number;
  after?: string | null;
  getCursor: (item: T) => string; // Función para obtener el cursor único
};

/**
 * Creates a generic connection for paginated GraphQL results.
 * @param params - Pagination parameters and items to paginate.
 * @returns A generic connection object.
 */
export function createConnection<T>({
  items,
  first = 10,
  after,
  getCursor,
}: ConnectionParams<T>) {
  if (!items || items.length === 0) {
    // Return an empty connection if the item list is empty
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

  // Find the index of the item matching the cursor "after"
  const offset = after
    ? items.findIndex((item) => getCursor(item) === after) + 1
    : 0;

  // Slice the array of items to apply pagination
  const paginatedItems = items.slice(offset, offset + first);

  // Create edges with a unique cursor for each item
  const edges = paginatedItems.map((item) => ({
    cursor: getCursor(item),
    node: item,
  }));

  // Calculate the total number of items before pagination
  const totalCount = items.length;

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
