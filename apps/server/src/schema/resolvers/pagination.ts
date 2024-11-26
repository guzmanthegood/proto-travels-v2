// resolvers/pagination.ts

// Interface for pagination arguments used across different connection creators.
export interface PaginationArgs {
  first?: number;
  after?: string;
  sort?: {
    field: string;
    order: "ASC" | "DESC";
  };
}
