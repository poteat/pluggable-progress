import { ProgressReporterManager } from "../../core/manager/ProgressReporterManager";
import { TemporalProgress } from "./TemporalProgress";

test("Can use progress type", async () => {
  const manager = new ProgressReporterManager(TemporalProgress);

  let ran = 0;

  const { step } = manager.new("temporal")({
    async callback() {
      ran += 1;
    },
    deltaTimeMs: 100,
  });

  await step();

  expect(ran).toStrictEqual(1);
});

test("Will throw error on invalid delta time parameter", async () => {
  const manager = new ProgressReporterManager(TemporalProgress);

  expect(() =>
    manager.new("temporal")({
      async callback() {},
      deltaTimeMs: -500,
    })
  ).toThrow();
});
