/**
 * The step callback as implemented by the application being reported on.
 */
export type StepCallback<T = undefined> = T extends undefined
  ? () => Promise<void>
  : (x: T) => Promise<void>;
