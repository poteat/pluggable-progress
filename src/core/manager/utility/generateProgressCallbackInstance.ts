import { A } from "ts-toolbelt";

import { GenericProgressCallbackType } from "../../../utility/callback/GenericProgressCallbackType";
import { ProgressTypeImplementation } from "../../components/implementation/generic/ProgressTypeImplementation";

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
    return (
      progressCallback: GenericProgressCallbackType<
        Extract<
          ProgressImplementations[number],
          { type: ParticularType }
        >["_type"]
      >
    ) => {
      let currentStep = 0;

      const { type, callback } = progressCallback;

      const stepConstructor = stepImplementations[type];

      if (!stepConstructor) {
        throw new Error(
          `No registered progress callback handler for "${type}".`
        );
      }

      const step = stepConstructor(progressCallback).step;

      return {
        step: (async (
          stepParameters: Extract<
            ProgressImplementations[number],
            { type: ParticularType }
          >["_type"]["stepParameters"]
        ) => {
          await step!({
            currentStep,
            callback,
            ...stepParameters,
          });

          currentStep++;
        }) as A.Equals<
          Extract<
            ProgressImplementations[number],
            { type: ParticularType }
          >["_type"]["stepParameters"],
          any
        > extends 0
          ? (
              x: Extract<
                ProgressImplementations[number],
                { type: ParticularType }
              >["_type"]["stepParameters"]
            ) => Promise<void>
          : () => Promise<void>,
      };
    };
  };
}
