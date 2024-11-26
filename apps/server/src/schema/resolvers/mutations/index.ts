// resolvers/mutations/index.ts
// Centraliza todos los resolvers de las mutations

export const mutationResolvers = {
  test: async (parent: any, args: any, context: any) => {
    return "Test mutation executed";
  },
};

console.log("[Resolvers] Mutation resolvers loaded");
