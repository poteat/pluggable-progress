/**
 * An underlying specification for a progress type implementation, implemented
 * by downstream producers of progress type implementations in order to nicely
 * package the subtypes associated with a progress type.
 */

export type GenericProgressCallbackSpecification = {
  /**
   * The parameters that the application must pass when calling `step`. These
   * are most likely application specific, perhaps involving the actual contents
   * of the task being performed.
   *
   * If these exist, they are automatically also passed to the callback function
   * via it's second parameter.
   */
  stepParameters?: any;

  /**
   * The callback parameters that the progress reporter utilizes. These are
   * parameters that the callback receives from the progress reporter itself.
   */
  callbackParameters?: any;

  /**
   * A series of options specific to the particular progress reporter type.
   *
   * These are initialized when the callback is defined, and most commonly
   * control e.g. the frequency of execution, or logical conditions thereof.
   */
  options: any;
};
