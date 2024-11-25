import { QueryResolvers, SortField, SortOrder } from "../types";

export const queryResolver: QueryResolvers = {
  availability: async (_, { params }) => {
    return {
      id: "search-123",
      params: {
        checkIn: params?.checkIn || "2024-01-01",
        checkOut: params?.checkOut || "2024-01-07",
        search: {
          hotelCode: params?.search?.hotelCode || null,
          cityCode: params?.search?.cityCode || "ABC",
          coordinates: params?.search?.coordinates || {
            latitude: 40.7128,
            longitude: -74.006,
            radius: 10,
          },
        },
        filters: params?.filters || [],
        sort: params?.sort || { field: SortField.Price, order: SortOrder.Asc },
      },
      responseTime: {
        total: 500,
        provider: 300,
      },
      hotelsConnection: {
        totalCount: 2,
        edges: [
          {
            cursor: "1",
            node: {
              code: "H001",
              name: "Hotel Paradise",
              stars: 5,
              address: "123 Beach Road",
              promo: true,
              city: "Hawaii",
              additionalData: {
                pictures: ["url1", "url2"],
                description: "A beautiful hotel by the beach.",
              },
              agreements: {
                totalCount: 1,
                edges: [
                  {
                    cursor: "1",
                    node: {
                      id: "AG001",
                      roomType: "Deluxe Suite",
                      available: true,
                      roomBasis: "Full Board",
                      mealBasis: "All Inclusive",
                      ctype: "Refundable",
                      price: {
                        amount: 500,
                        currency: {
                          code: "USD",
                          name: "United States Dollar",
                        },
                      },
                      isFullyRefundable: true,
                    },
                  },
                ],
                pageInfo: {
                  hasNextPage: false,
                  hasPreviousPage: false,
                  startCursor: "1",
                  endCursor: "1",
                },
              },
            },
          },
        ],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: "1",
          endCursor: "1",
        },
      },
    };
  },
};
