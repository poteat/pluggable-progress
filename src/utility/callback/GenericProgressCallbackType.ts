import { GenericProgressCallbackSpecification } from "../../core/components/specification/GenericProgressCallbackSpecification";
import { CastAnyToUndefined } from "../casts/CastAnyToUndefined";
import { CastUndefinedToEmptyObject } from "../casts/CastUndefinedToEmptyObject";
import { CommonProgressCallbackParameters } from "./common/CommonProgressCallbackParameters";

/**
 * A type representing the interface with which all progress reporter types
 * must extend. Specifically, a progress reporter type is required to have
 * attributes type, callback, and a series of custom attributes "options".
 */
export type GenericProgressCallbackType<
  SpecificSpecification extends GenericProgressCallbackSpecification
> = {
  /**
   * The underlying callback that e.g. will render or report the current state
   * of the application. This could be a network call, a React renderer, a
   * CLI logger, etc.
   *
   * @param params Parameters of the current reported step.
   */
  callback(
    params: CastUndefinedToEmptyObject<
      CastAnyToUndefined<SpecificSpecification["callbackParameters"]>
    > &
      CastUndefinedToEmptyObject<
        CastAnyToUndefined<SpecificSpecification["stepParameters"]>
      > &
      CommonProgressCallbackParameters
  ): Promise<void>;
} & SpecificSpecification["options"];
