// resolvers/hotel/hotelConnection.ts
// Resolver para el tipo "HotelConnection"

export const HotelConnection = {
  totalCount: (parent: any) => {
    console.log('[Resolvers] Resolving "totalCount" for HotelConnection');
    return parent.totalCount || 0;
  },
  edges: (parent: any) => {
    console.log('[Resolvers] Resolving "edges" for HotelConnection');
    return parent.edges || [];
  },
};

console.log("[Resolvers] HotelConnection type resolvers loaded");
