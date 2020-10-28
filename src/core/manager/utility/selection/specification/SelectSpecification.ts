import { ProgressTypeImplementation } from "../../../../components/implementation/generic/ProgressTypeImplementation";
import { SelectImplementation } from "../implementation/SelectImplementation";

/**
 * Given an array of progress type implementations, select the specification
 * given the particular progress type.
 */
export type SelectSpecification<
  ProgressImplementations extends ProgressTypeImplementation[],
  ParticularType extends ProgressImplementations[number]["type"]
> = SelectImplementation<ProgressImplementations, ParticularType>["_type"];
