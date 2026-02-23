import { GraphQLScalarType, Kind } from "graphql";

export const TimestampScalarType = `
  scalar Timestamp
`;

export const TimestampScalar = new GraphQLScalarType({
  name: "Timestamp",
  description: "Represents a ISO timestamp string as a scalar",

  serialize(value: unknown): string {
    if (value instanceof Date) {
      return value.toISOString();
    }

    if (typeof value === "string" || typeof value === "number") {
      return new Date(value).toISOString();
    }

    throw new Error("This value cannot serialize into a date");
  },

  parseValue(value: unknown): Date {
    if (value instanceof Date) {
      return value;
    }
    if (typeof value === "string" || typeof value === "number") {
      return new Date(value);
    }
    throw new Error("This value cannot serialize into a date");
  },

  parseLiteral(ast): Date {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    throw new Error("Timestamp must be an ISO string");
  },
});
