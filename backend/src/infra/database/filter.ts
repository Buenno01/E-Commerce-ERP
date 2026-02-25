export interface StringFilter {
  equals?: string;
  contains?: string;
  startsWith?: string;
}

export interface IntFilter {
  equals?: number;
  gte?: number;
  lte?: number;
  gt?: number;
  lt?: number;
}

export type FilterValue = StringFilter | IntFilter;

export interface Filter<T extends Record<string, FilterValue>> {
  AND?: Filter<T>[];
  OR?: Filter<T>[];
  NOT?: Filter<T>;
  fields?: Partial<T>;
}
