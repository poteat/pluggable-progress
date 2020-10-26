import { A } from "ts-toolbelt";

/**
 * If the parameter type is equal to `any`, cast it to undefined.
 */
export type CastAnyToUndefined<T> = A.Equals<T, any> extends 0 ? T : undefined;
