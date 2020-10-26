import { GenericProgressCallbackSpecification } from "../../core/components/specification/GenericProgressCallbackSpecification";
import { ProgressStepParameters } from "./parameters/ProgressStepParameters";

/**
 * A step execution function implemented by a downstream implementor. All step
 * execution functions are asynchronous, in order to potentially handle
 * asynchronous application callbacks.
 */
export type ProgressStepFunction<
  T extends GenericProgressCallbackSpecification
> = (x: ProgressStepParameters<T>) => Promise<void>;
