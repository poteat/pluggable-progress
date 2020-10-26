import { PercentageProgress } from "../../built-ins/percentage/PercentageProgress";
import { TemporalProgress } from "../../built-ins/temporal/TemporalProgress";
import { ProgressReporterManager } from "./ProgressReporterManager";

test("Can initialize the manager", async () => {
  const manager = new ProgressReporterManager();
  expect(manager).toBeTruthy();
});

test("Will crash if unregistered progress type is invoked", async () => {
  const manager = new ProgressReporterManager();

  expect(() => manager.new(("foobar" as unknown) as never)).toThrow();
});

test("Can register, instantiate, and call a simple progress type", async () => {
  const manager = new ProgressReporterManager(PercentageProgress);

  let ran = 0;

  const { step } = manager.new("percentage")({
    async callback() {
      ran += 1;
    },
    deltaPercentage: 0.01,
    totalSteps: 100,
  });

  expect(step).toBeTruthy();

  await step();

  expect(ran).toStrictEqual(1);
});

test("Can register and execute multiple progress types", async () => {
  const manager = new ProgressReporterManager(
    PercentageProgress,
    TemporalProgress
  );

  let ran = 0;

  const { step } = manager.new("percentage")({
    async callback() {
      ran += 1;
    },
    deltaPercentage: 0.01,
    totalSteps: 100,
  });

  expect(step).toBeTruthy();

  await step();

  expect(ran).toStrictEqual(1);
});
