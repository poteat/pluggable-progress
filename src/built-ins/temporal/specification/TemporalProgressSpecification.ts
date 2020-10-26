import { GenericProgressCallbackSpecification } from "../../../core/components/specification/GenericProgressCallbackSpecification";

/**
 * The specification associated with the temporal progress type.
 */
export interface TemporalProgressSpecification
  extends GenericProgressCallbackSpecification {
  callbackParameters: {
    /**
     * The time, in milliseconds, since the operation started. Positive
     * integer.
     */
    time: number;
  };

  options: {
    /**
     * How often to report, in milliseconds. Must be a non-negative number.
     */
    deltaTimeMs: number;
  };
}
