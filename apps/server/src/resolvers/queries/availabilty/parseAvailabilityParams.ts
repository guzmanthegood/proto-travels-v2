import {
  AvailabilityParams,
  AvailabilityParamsInput,
  SortField,
  SortOrder,
} from "../../../schema/types";

export const parseAvailabilityParams = (
  input: AvailabilityParamsInput
): AvailabilityParams => {
  return {
    checkIn: input.checkIn || "2024-01-01",
    checkOut: input.checkOut || "2024-01-07",
    search: input.search || null,
    filters: input.filters || [],
    sort: {
      field: input.sort?.field || SortField.Price,
      order: input.sort?.order || SortOrder.Asc,
    },
  };
};
