import { GenericProgressCallbackSpecification } from "../../../core/components/specification/GenericProgressCallbackSpecification";
import { GenericProgressCallbackType } from "../../callback/GenericProgressCallbackType";
import { CastAnyToUndefined } from "../../casts/CastAnyToUndefined";
import { CastUndefinedToEmptyObject } from "../../casts/CastUndefinedToEmptyObject";

/**
 * The parameters associated with a `step` progress type implementation. The
 * underlying implementation recieves a number of parameters, which along with
 * its internal state, decides whether or not callback should be called, and
 * with what data.
 */
export type ProgressStepParameters<
  T extends GenericProgressCallbackSpecification
> = {
  /**
   * The current step of the operation, a non-negative integer beginning at
   * zero.
   */
  currentStep: number;

  /**
   * The application callback to potentially execute, depending on internal
   * logic.
   */
  callback: GenericProgressCallbackType<T>["callback"];
} & CastUndefinedToEmptyObject<CastAnyToUndefined<T["stepParameters"]>>;
