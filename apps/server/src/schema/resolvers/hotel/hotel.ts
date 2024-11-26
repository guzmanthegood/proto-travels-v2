// resolvers/hotel/hotel.ts

export const Hotel = {
  promo: (parent: any) => {
    return parent.promo || false;
  },
  stars: (parent: any) => {
    return parent.stars || "0";
  },
};

console.log("[Resolvers] Hotel type resolvers loaded");
