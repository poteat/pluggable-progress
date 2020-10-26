import { GenericProgressCallbackSpecification } from "../../../core/components/specification/GenericProgressCallbackSpecification";

/**
 * The specification which defines the percentage progress type.
 */
export interface PercentageProgressSpecification
  extends GenericProgressCallbackSpecification {
  callbackParameters: {
    /**
     * The current percentage of the underlying operation.
     */
    percent: number;
  };
  options: {
    /**
     * Report every X percent, must be a number from 0 to 1 inclusive.
     */
    deltaPercentage: number;

    /**
     * Expected total number of steps, used to calculate the percentage
     * completed.
     */
    totalSteps: number;
  };
}
