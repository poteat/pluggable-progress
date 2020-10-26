/**
 * If the underlying type is undefined, instead cast it to the empty object for
 * a later potential intersection operation.
 */
export type CastUndefinedToEmptyObject<T> = T extends undefined ? {} : T;
