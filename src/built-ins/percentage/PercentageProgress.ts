import { isSafeInteger } from "lodash";

import { ProgressType } from "../../core/components/implementation/ProgressType";
import { ProgressStepParameters } from "../../utility/step/parameters/ProgressStepParameters";
import { PercentageProgressSpecification } from "./specification/PercentageProgressSpecification";

/**
 * A progress type whereby the reporter is called every X%, where by estimate
 * the current percent via a total number of expected steps. The underlying
 * callback receives the current percentage as a number from 0 to 1.
 *
 * Calls on last step with a percentage of 1. If further steps are called, they
 * do not result in additional reports.
 *
 * @param deltaPercentage Report every X%, number from 0 to 1 inclusive.
 * @param totalSteps Total steps in the associated process.
 */
export const PercentageProgress: ProgressType<
  "percentage",
  PercentageProgressSpecification
> = ({ deltaPercentage, totalSteps }) => {
  let lastReportedPercentage = -Infinity;

  if (deltaPercentage <= 0 || deltaPercentage > 1) {
    throw new TypeError("`deltaPercentage` must be between (0, 1].");
  }

  if (!isSafeInteger(totalSteps) || totalSteps <= 0) {
    throw new TypeError("`totalSteps` must be a positive integer.");
  }

  return {
    async step({
      currentStep,
      callback,
    }: ProgressStepParameters<PercentageProgressSpecification>) {
      const currentPercentage = (currentStep + 1) / totalSteps;

      const isCompletionStep = currentPercentage === 1;

      const reportNeeded =
        currentPercentage - lastReportedPercentage > deltaPercentage ||
        isCompletionStep;

      const percentageInValidRange =
        currentPercentage >= 0 && currentPercentage <= 1;

      if (reportNeeded && percentageInValidRange) {
        lastReportedPercentage = currentPercentage;
        await callback({ percent: currentPercentage, step: currentStep });
      }
    },
  };
};

PercentageProgress["type"] = "percentage";
PercentageProgress["_type"] = {} as any;
