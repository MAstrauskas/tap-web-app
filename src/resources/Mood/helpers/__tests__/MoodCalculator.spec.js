import { productivityCalculator } from "../MoodCalculator";

describe("MoodCalculator", () => {
  it("should calculate productivity when motivation is high", () => {
    const data = {
      points: 0,
      motivation: "High",
      isTired: false
    };

    const calculatedProductivity = productivityCalculator(
      data.points,
      data.motivation,
      data.isTired
    );

    expect(calculatedProductivity).toBe(3);
  });

  it("should calculate productivity when motivation is medium", () => {
    const data = {
      points: 0,
      motivation: "Medium",
      isTired: false
    };

    const calculatedProductivity = productivityCalculator(
      data.points,
      data.motivation,
      data.isTired
    );

    expect(calculatedProductivity).toBe(2);
  });

  it("should calculate productivity when motivation is low", () => {
    const data = {
      points: 0,
      motivation: "Low",
      isTired: false
    };

    const calculatedProductivity = productivityCalculator(
      data.points,
      data.motivation,
      data.isTired
    );

    expect(calculatedProductivity).toBe(1);
  });

  it("should substract one if the user is tired", () => {
    const data = {
      points: 0,
      motivation: "High",
      isTired: true
    };

    const calculatedProductivity = productivityCalculator(
      data.points,
      data.motivation,
      data.isTired
    );

    expect(calculatedProductivity).toBe(2);
  });
});
