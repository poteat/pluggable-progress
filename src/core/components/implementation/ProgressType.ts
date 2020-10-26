import { ProgressStepFunction } from "../../../utility/step/ProgressStepFunction";
import { GenericProgressCallbackSpecification } from "../specification/GenericProgressCallbackSpecification";

/**
 * A particular concrete progress type given its progress type literal, and the
 * underlying progress type specification.
 */
export type ProgressType<
  ProgressType extends string,
  ProgressSpecification extends GenericProgressCallbackSpecification
> = ((
  options: ProgressSpecification["options"]
) => {
  step: ProgressStepFunction<ProgressSpecification>;
}) & { type: ProgressType; _type: ProgressSpecification };
