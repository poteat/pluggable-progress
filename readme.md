![pluggable-progress](./logo/pluggable-progress.png)

A pluggable Typescript library for defining and using custom progress reporters.

> Also a great example of plugin-based architecture with dependent types!

---

## Installation

```sh
npm i pluggable-progress
```

---

## Usage

```ts
import ProgressConstructor, { 
  PercentageProgress, 
  FrequencyProgress
} from "pluggable-progress"

/**
 * Initialize your application-specific set of progress types, some of which
 * may be built-in and some of which may be defined by the application.
 */
const progressConstructor = ProgressConstructor(
  PercentageProgress,
  FrequencyProgress
);

/**
 * Define a particular reporter instance, which reports every 10% completed on
 * a task which takes one million steps.
 */
const { step } = progressConstructor.new({
    type: "percentage",
    callback({ percent }) {
      console.log(`${percent.toFixed(0)}% completed.`)
    },
    deltaPercentage: 0.1,
    totalNumberOfSteps: 1,000,000
  }
)

/**
 * In your application logic, just call `step` and don't worry about the
 * underlying details of the progress reporter.
 */
for (let i = 0; i <= 1,000,000; i++) {
  await step();
}
```

---

## Motivation

Frequently for long running operations, it's necessary to call back every now and then, either with some partial results, or merely to report the current progress and/or status of its operation.

Instead of doing this ad-hoc per operation, it's valuable to have a framework for both defining those callbacks, and for specifying the _types_ of callbacks involved.

Although some progress types are built-in, the library is fully extensible on the application layer through virtue of dynamic tuple types. You can choose your own logic for how often to report, your own configuration types, and your own message-passing interface between the application and the reporter.

## Contribution

Contribution is encouraged! If I missed anything, or there's a use-case I didn't consider, definitely feel free to file an issue and/or PR. This project is licensed under the MIT license as most npm packages are. (see [license.md](./license.md)).
