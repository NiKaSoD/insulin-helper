// calculator.js
// Чистые математические функции. Этот файл не работает с DOM и localStorage.
(function () {
  function roundTo(value, digits = 2) {
    const factor = 10 ** digits;
    return Math.round((Number(value) + Number.EPSILON) * factor) / factor;
  }

  function calculateByProduct({ grams, carbsPer100, xeCarbValue, insulinRatio }) {
    const totalCarbs = (Number(grams) * Number(carbsPer100)) / 100;
    const breadUnits = totalCarbs / Number(xeCarbValue);
    const exactDose = breadUnits * Number(insulinRatio);

    return {
      totalCarbs: roundTo(totalCarbs, 2),
      breadUnits: roundTo(breadUnits, 2),
      exactDose: roundTo(exactDose, 2)
    };
  }

  function calculateByXe({ breadUnits, xeCarbValue, insulinRatio }) {
    const totalCarbs = Number(breadUnits) * Number(xeCarbValue);
    const exactDose = Number(breadUnits) * Number(insulinRatio);

    return {
      totalCarbs: roundTo(totalCarbs, 2),
      breadUnits: roundTo(Number(breadUnits), 2),
      exactDose: roundTo(exactDose, 2)
    };
  }

  function getDoseOptions(exactDose, doseStep) {
    const exact = Number(exactDose);
    const step = Number(doseStep);
    const lower = roundTo(Math.floor(exact / step) * step, 2);
    const upper = roundTo(Math.ceil(exact / step) * step, 2);
    const lowerDiff = roundTo(exact - lower, 2);
    const upperDiff = roundTo(upper - exact, 2);
    const nearest = Math.abs(lowerDiff) <= Math.abs(upperDiff) ? lower : upper;

    return {
      lower,
      upper,
      nearest,
      lowerDiff,
      upperDiff
    };
  }

  window.Calculator = {
    roundTo,
    calculateByProduct,
    calculateByXe,
    getDoseOptions
  };
})();
