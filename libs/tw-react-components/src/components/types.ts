export type Size = 'small' | 'medium' | 'large';

type NextDepth = {
  '1': never;
  '2': '1';
  '3': '2';
  '4': '3';
  '5': '4';
  '6': '5';
  '7': '6';
  '8': '7';
  '9': '8';
  '10': '9';
};

export type Paths<T, Depth extends keyof NextDepth = '10'> = Depth extends keyof NextDepth
  ? T extends ReadonlyArray<infer R>
    ? `[${Paths<R, NextDepth[Depth]>}]`
    : T extends object
    ? {
        [K in keyof T]: `${Exclude<K, symbol>}${'' | `.${Paths<T[K], NextDepth[Depth]>}`}`;
      }[keyof T]
    : never
  : never;

export type ResolvePath<T, Path extends Paths<T>> = Path extends ''
  ? T
  : Path extends `[${infer NestedPath}]`
  ? T extends ReadonlyArray<infer R>
    ? NestedPath extends Paths<R>
      ? ResolvePath<R, NestedPath>
      : never
    : never
  : Path extends `${infer Field}.${infer Rest}`
  ? Field extends keyof T
    ? Rest extends Paths<T[Field]>
      ? ResolvePath<T[Field], Rest>
      : never
    : never
  : Path extends `${infer Field}`
  ? Field extends keyof T
    ? T[Field]
    : never
  : T;
