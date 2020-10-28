import { GenericProgressCallbackType } from "../../../utility/callback/GenericProgressCallbackType";
import { StepCallback } from "../../../utility/step/application/StepCallback";
import { ProgressTypeImplementation } from "../../components/implementation/generic/ProgressTypeImplementation";
import { SelectSpecification } from "./selection/specification/SelectSpecification";
import { StepParameters } from "./selection/step/StepParameters";

/**
 * Given a stepImplementations set, a particular progress type, and a defined
 * progress callback on that type (in curried order), return a new instance of
 * the requested progress type with those options.
 *
 * @param stepImplementations Implementations map of progress types
 * @param type Requested progress type
 * @param progressCallback The options necessary to construct a new callback.
 */
export function generateProgressCallbackInstance<
  ProgressImplementations extends ProgressTypeImplementation[]
>(stepImplementations: Record<string, ProgressImplementations[number]>) {
  return <ParticularType extends ProgressImplementations[number]["type"]>(
    _type: ParticularType
  ) => {
    const stepConstructor = stepImplementations[_type];

    if (!stepConstructor) {
      throw new Error(
        `No registered progress callback handler for "${_type}".`
      );
    }
    return (
      progressCallback: GenericProgressCallbackType<
        SelectSpecification<ProgressImplementations, ParticularType>
      >
    ) => {
      let currentStep = 0;

      const { callback } = progressCallback;

      const step = stepConstructor(progressCallback).step;

      return {
        step: (async (
          stepParameters: StepParameters<
            ProgressImplementations,
            ParticularType
          >
        ) => {
          await step({
            currentStep,
            callback,
            ...stepParameters,
          });

          currentStep++;
        }) as StepCallback<
          StepParameters<ProgressImplementations, ParticularType>
        >,
      };
    };
  };
}
