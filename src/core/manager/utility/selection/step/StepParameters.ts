import { CastAnyToUndefined } from "../../../../../utility/casts/CastAnyToUndefined";
import { ProgressTypeImplementation } from "../../../../components/implementation/generic/ProgressTypeImplementation";
import { SelectSpecification } from "../specification/SelectSpecification";

/**
 * Given a set of progress implementations and a particular progress type, get
 * the step parameters associated with that type.
 */
export type StepParameters<
  ProgressImplementations extends ProgressTypeImplementation[],
  ParticularType extends ProgressImplementations[number]["type"]
> = CastAnyToUndefined<
  SelectSpecification<ProgressImplementations, ParticularType>["stepParameters"]
>;
