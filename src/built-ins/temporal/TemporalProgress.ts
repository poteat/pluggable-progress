import { ProgressType } from "../../core/components/implementation/ProgressType";
import { ProgressStepParameters } from "../../utility/step/parameters/ProgressStepParameters";
import { TemporalProgressSpecification } from "./specification/TemporalProgressSpecification";

/**
 * A progress type for reporting back every constant number of milliseconds,
 * nearest to the closest step.
 *
 * @param param0 How often to report back, in milliseconds.
 */
export const TemporalProgress: ProgressType<
  "temporal",
  TemporalProgressSpecification
> = ({ deltaTimeMs }: TemporalProgressSpecification["options"]) => {
  let lastReportTime = -Infinity;

  if (deltaTimeMs <= 0) {
    throw new TypeError("Parameter `deltaTimeMs` must be a positive number.");
  }

  return {
    async step({
      currentStep,
      callback,
    }: ProgressStepParameters<TemporalProgressSpecification>) {
      const now = Date.now();
      if (now - lastReportTime > deltaTimeMs) {
        await callback({ time: now, step: currentStep });
        lastReportTime = now;
      }
    },
  } as const;
};

TemporalProgress["type"] = "temporal";
TemporalProgress["_type"] = {} as any;
