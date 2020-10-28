import { ProgressTypeImplementation } from "../../../../components/implementation/generic/ProgressTypeImplementation";

/**
 * Given an array of progress type implementations, select the specific progress
 * type implementation specified.
 */
export type SelectImplementation<
  ProgressImplementations extends ProgressTypeImplementation[],
  ParticularType extends ProgressImplementations[number]["type"]
> = Extract<ProgressImplementations[number], { type: ParticularType }>;
