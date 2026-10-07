type UnitValues = readonly [string, ...string[]];
type YearKey = `y-${number}`;

type MatrixDefaultOptions =
  | {
      unit: UnitValues;
      unitsByKeys?: never;
      unitsByCols?: never;
    }
  | {
      unit?: never;
      unitsByKeys: Record<string, UnitValues>;
      unitsByCols?: never;
    };

type GridDefaultOptions =
  | MatrixDefaultOptions
  | {
      unit?: never;
      unitsByKeys?: never;
      unitsByCols: Record<string, UnitValues>;
    };

function toYearKey(year: number): YearKey {
  return `y-${year}`;
}

export function createYearValueDefaults(years: readonly number[]) {
  return Object.fromEntries(years.map((year) => [toYearKey(year), undefined])) as Record<
    YearKey,
    undefined
  >;
}

export function createScalarValueDefaults(unit: UnitValues) {
  return {
    value: undefined,
    unit: unit[0],
  };
}

export function createYearValueFieldDefaults(unit: UnitValues, years: readonly number[]) {
  return {
    value: createYearValueDefaults(years),
    unit: unit[0],
  };
}

export function createMatrixDefaults(
  keys: readonly string[],
  options: MatrixDefaultOptions,
  years: readonly number[]
) {
  const { unit, unitsByKeys } = options;

  return Object.fromEntries(
    keys.map((key) => [key, createYearValueFieldDefaults(unit ?? unitsByKeys![key], years)])
  );
}

export function createGridDefaults(
  keys: readonly string[],
  nestedKeys: readonly string[],
  options: GridDefaultOptions,
  years: readonly number[]
) {
  const { unit, unitsByKeys, unitsByCols } = options;

  return Object.fromEntries(
    keys.map((key) => [
      key,
      Object.fromEntries(
        nestedKeys.map((nestedKey) => [
          nestedKey,
          createYearValueFieldDefaults(
            unit ?? unitsByKeys?.[key] ?? unitsByCols![nestedKey],
            years
          ),
        ])
      ),
    ])
  );
}
