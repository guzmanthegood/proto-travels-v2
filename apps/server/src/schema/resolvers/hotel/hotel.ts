// resolvers/hotel/hotel.ts
// Resolver para el tipo "Hotel"

export const Hotel = {
  promo: (parent: any) => {
    console.log('[Resolvers] Resolving "promo" field for Hotel');
    return parent.promo || false;
  },
  stars: (parent: any) => {
    console.log('[Resolvers] Resolving "stars" field for Hotel');
    return parent.stars || '0';
  },
};

console.log('[Resolvers] Hotel type resolvers loaded');
