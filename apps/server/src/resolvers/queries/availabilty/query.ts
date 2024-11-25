import { QueryResolvers, SortField, SortOrder } from "../../../schema/types";
import { createHotelConnection } from "./createHotelConnection";
import hotels from "./hotels";

export const availability: QueryResolvers["availability"] = async (
  _,
  { params }
) => {
  const first: number = params?.first ?? 10;

  const hotelsConnection = createHotelConnection(hotels, {
    first,
    after: params?.after,
  });

  return {
    id: "search-123",
    params: {
      checkIn: params?.checkIn || "2024-01-01",
      checkOut: params?.checkOut || "2024-01-07",
      search: params?.search || null,
      filters: params?.filters || [],
      sort: params?.sort || { field: SortField.Price, order: SortOrder.Asc },
    },
    responseTime: {
      total: 500,
      provider: 300,
    },
    hotelsConnection,
  };
};
