// resolvers/queries/availability.ts
// Resolver para la query "availability"

export const availabilityResolver = async (
  parent: any,
  args: any,
  context: any
) => {
  console.log("[Resolvers] In availability query resolver");
  console.log("Arguments:", args);
  console.log("Context:", context);

  // Aquí irá la lógica de la query (por ahora solo retornamos un mock)
  return {
    id: "availability-id",
    params: args.params,
    responseTime: { total: 0, provider: 0 },
    hotelsConnection: null,
  };
};
