import { GraphQLScalarType, Kind } from "graphql";
import { isValid, parseISO } from "date-fns";

/**
 * Custom scalar for dates in YYYY-MM-DD format.
 */
const DateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Custom scalar for dates in YYYY-MM-DD format",
  parseValue(value) {
    if (typeof value !== "string") {
      throw new TypeError(`Date value must be a string, received: ${typeof value}`);
    }
    const parsedDate = parseISO(value);
    if (!isValid(parsedDate)) {
      throw new Error(`Invalid date format, expected YYYY-MM-DD, received: ${value}`);
    }
    return value; // Pass as string to resolvers
  },
  serialize(value) {
    if (typeof value !== "string") {
      throw new TypeError(`Date value must be a string, received: ${typeof value}`);
    }
    const parsedDate = parseISO(value);
    if (!isValid(parsedDate)) {
      throw new Error(`Invalid date format for serialization: ${value}`);
    }
    return value;
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new Error(`Date literal must be a string, received: ${ast.kind}`);
    }
    const parsedDate = parseISO(ast.value);
    if (!isValid(parsedDate)) {
      throw new Error(`Invalid date format, expected YYYY-MM-DD, received: ${ast.value}`);
    }
    return ast.value;
  },
});

export default DateScalar;
