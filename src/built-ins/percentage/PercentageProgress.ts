import { ProgressType } from "../../core/components/implementation/ProgressType";
import { ProgressStepParameters } from "../../utility/step/parameters/ProgressStepParameters";
import { PercentageProgressSpecification } from "./specification/PercentageProgressSpecification";

/**
 * A progress type whereby the reporter is called every X%, where by estimate
 * the current percent via a total number of expected steps.
 *
 * @param deltaPercentage Report every X%, number from 0 to 1 inclusive.
 * @param totalSteps Total steps in the associated process.
 */
export const PercentageProgress: ProgressType<
  "percentage",
  PercentageProgressSpecification
> = ({ deltaPercentage, totalSteps }) => {
  let lastReportedPercentage = -Infinity;

  if (deltaPercentage < 0 || deltaPercentage > 1) {
    throw new TypeError(
      "Parameter `deltaPercentage` must be between 0 or 1, inclusive."
    );
  }

  return {
    async step({
      currentStep,
      callback,
    }: ProgressStepParameters<PercentageProgressSpecification>) {
      const currentPercentage = currentStep / totalSteps;

      if (currentPercentage - lastReportedPercentage > deltaPercentage) {
        lastReportedPercentage = currentPercentage;
        await callback({ percent: currentPercentage, step: currentStep });
      }
    },
  };
};

PercentageProgress["type"] = "percentage";
PercentageProgress["_type"] = {} as any;
