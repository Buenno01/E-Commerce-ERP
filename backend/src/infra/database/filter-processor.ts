import { Filter, FilterValue } from "./filter";

type FieldTransformer<TFilter, TPrisma> = (filter: TFilter) => TPrisma;

type FieldTransformerMap<
  TFilter extends Record<string, FilterValue>,
  TPrisma,
> = {
  [K in keyof TFilter]?: FieldTransformer<TFilter[K], Partial<TPrisma>>;
};

const LOGICAL_OPERATORS = new Set(["AND", "OR", "NOT"]);

export function processFilter<
  TFilter extends Record<string, FilterValue>,
  TPrismaWhere extends object,
>(transformers: FieldTransformerMap<TFilter, TPrismaWhere>) {
  function process(filter?: Filter<TFilter>): TPrismaWhere {
    if (!filter) return {} as TPrismaWhere;

    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(filter)) {
      if (LOGICAL_OPERATORS.has(key)) continue; // trata abaixo

      const transformer = transformers[key as keyof TFilter];
      if (transformer && value !== undefined) {
        Object.assign(result, transformer(value as TFilter[keyof TFilter]));
      }
    }

    if (filter.AND) result.AND = filter.AND.map(process);
    if (filter.OR) result.OR = filter.OR.map(process);
    if (filter.NOT) result.NOT = process(filter.NOT);

    return result as TPrismaWhere;
  }

  return process;
}
