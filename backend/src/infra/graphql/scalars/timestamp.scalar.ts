import { GraphQLScalarType, Kind } from "graphql";

export const TimestampScalarType = `
  scalar Timestamp
`;

export const TimestampScalar = new GraphQLScalarType({
    name: "Timestamp",
    description: "Represents a ISO timestamp string as a scalar",

    serialize(value: unknown): string {
        if (!["string", "number"].includes(typeof value) || !(value instanceof Date)) {
            throw new Error("This value cannot serialize into a date")
        }

        return (new Date(value)).toISOString();
    },

    parseValue(value: unknown): Date {
        if (!["string", "number"].includes(typeof value) || !(value instanceof Date)) {
            throw new Error("This value cannot serialize into a date")
        }
        return new Date(value);
    },

    parseLiteral(ast): Date {
        if (ast.kind === Kind.STRING) {
            return new Date(ast.value);
        }
        throw new Error("Timestamp must be an ISO string");
    },
});