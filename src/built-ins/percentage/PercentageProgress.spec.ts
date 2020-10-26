import { ProgressReporterManager } from "../../core/manager/ProgressReporterManager";
import { PercentageProgress } from "./PercentageProgress";

test("Can use progress type", async () => {
  const manager = new ProgressReporterManager(PercentageProgress);

  let ran = 0;
  const totalSteps = 150;
  const deltaPercentage = 0.1;

  const { step } = manager.new("percentage")({
    async callback({ percent }) {
      ran += 1;
    },
    deltaPercentage,
    totalSteps,
  });

  for (let i = 0; i < totalSteps; i++) {
    await step();
  }

  expect(ran).toStrictEqual(100 * deltaPercentage + 1);
});

test("Will throw error on invalid percentage", async () => {
  const manager = new ProgressReporterManager(PercentageProgress);

  expect(() =>
    manager.new("percentage")({
      async callback() {},
      deltaPercentage: 0,
      totalSteps: 150,
    })
  ).toThrow();
});

test("Will throw error on invalid total steps", async () => {
  const manager = new ProgressReporterManager(PercentageProgress);

  expect(() =>
    manager.new("percentage")({
      async callback() {},
      deltaPercentage: 0.1,
      totalSteps: 15.3,
    })
  ).toThrow();
});
