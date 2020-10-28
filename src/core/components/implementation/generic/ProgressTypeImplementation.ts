import { GenericProgressCallbackSpecification } from "../../specification/GenericProgressCallbackSpecification";

/**
 * An interface which specifies a class that defines a particular implementation
 * for a particular progress callback type.
 *
 * This is an analogue that is associated with no particular specification,
 * which is necessary to keep the type math consistent.
 */
export type ProgressTypeImplementation = {
  /**
   * The constructor, or alternatively the dynamic elements associated with the
   * class defining the progress type implementation.
   */
  (options: any): {
    /**
     * The underlying function that implements the progress type, by at each
     * step, choosing whether or not the application callback should be
     * executed, and performing that call via its own internal logic and state.
     */
    step(x: { currentStep: number; callback: any }): Promise<void>;
  };

  /**
   * The progress type identifier.
   */
  type: string;

  /**
   * The underlying specification associated with the progress type.
   */
  _type: GenericProgressCallbackSpecification;
};
