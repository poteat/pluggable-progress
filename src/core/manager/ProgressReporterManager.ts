import { ProgressTypeImplementation } from "../components/implementation/generic/ProgressTypeImplementation";
import { generateProgressCallbackInstance } from "./utility/generateProgressCallbackInstance";

/**
 * The core progress callback manager, which allows plugins to be defined in
 * order to specify new callback types, e.g. frequency based, time-based, etc.
 *
 * The system is built in a pluggable way, such that new callback types can be
 * defined by application-side logic, on both the type and value levels.
 *
 * New instances are constructed via calling `new Progress.Instance()`.
 */
export class ProgressReporterManager<
  ProgressImplementations extends ProgressTypeImplementation[]
> {
  /**
   * The set of all registered step implementations for this manager instance.
   */
  private stepImplementations: Record<
    string,
    ProgressImplementations[number]
  > = {};

  constructor(...plugins: ProgressImplementations) {
    for (const plugin of plugins) {
      const { type } = plugin;
      this.stepImplementations[type] = plugin;
    }
  }

  /**
   * Instantiate a new ProgressCallback instance, with a particular set of
   * configuration parameters depending on the generated callback type.
   */
  public new = generateProgressCallbackInstance<ProgressImplementations>(
    this.stepImplementations
  );
}
