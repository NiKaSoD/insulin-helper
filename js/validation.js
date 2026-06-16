// validation.js
// Проверка пользовательского ввода перед расчётами и сохранением настроек.
(function () {
  function t(key) {
    return window.UI?.t(key) || key;
  }

  function parseNumber(value) {
    if (typeof value === 'number') return value;
    if (typeof value !== 'string') return NaN;
    return Number(value.replace(',', '.').trim());
  }

  function isAllowedDoseStep(value) {
    return [1, 0.5, 0.1].includes(Number(value));
  }

  function result(fieldErrors) {
    return {
      isValid: Object.keys(fieldErrors).length === 0,
      fieldErrors,
      errors: Object.values(fieldErrors)
    };
  }

  function validateProductInput(data) {
    const errors = {};
    const grams = parseNumber(data.grams);
    const carbsPer100 = parseNumber(data.carbsPer100);
    const xeCarbValue = parseNumber(data.xeCarbValue);
    const insulinRatio = parseNumber(data.insulinRatio);
    const doseStep = parseNumber(data.doseStep);

    if (!Number.isFinite(grams) || grams <= 0) errors['product-grams'] = t('errors.grams');
    if (!Number.isFinite(carbsPer100) || carbsPer100 < 0 || carbsPer100 > 100) errors['product-carbs'] = t('errors.carbs');
    if (!Number.isFinite(xeCarbValue) || xeCarbValue <= 0) errors['settings-xe'] = t('errors.xeValue');
    if (!Number.isFinite(insulinRatio) || insulinRatio <= 0) errors['settings-ratio'] = t('errors.ratio');
    if (!isAllowedDoseStep(doseStep)) errors['settings-dose-step'] = t('errors.doseStep');

    return result(errors);
  }

  function validateXeInput(data) {
    const errors = {};
    const breadUnits = parseNumber(data.breadUnits);
    const xeCarbValue = parseNumber(data.xeCarbValue);
    const insulinRatio = parseNumber(data.insulinRatio);
    const doseStep = parseNumber(data.doseStep);

    if (!Number.isFinite(breadUnits) || breadUnits <= 0) errors['xe-count'] = t('errors.breadUnits');
    if (!Number.isFinite(xeCarbValue) || xeCarbValue <= 0) errors['settings-xe'] = t('errors.xeValue');
    if (!Number.isFinite(insulinRatio) || insulinRatio <= 0) errors['settings-ratio'] = t('errors.ratio');
    if (!isAllowedDoseStep(doseStep)) errors['settings-dose-step'] = t('errors.doseStep');

    return result(errors);
  }

  function validateSettings(data, prefix = 'settings') {
    const errors = {};
    const xeCarbValue = parseNumber(data.xeCarbValue);
    const insulinRatio = parseNumber(data.insulinRatio);
    const doseStep = parseNumber(data.doseStep);

    if (!Number.isFinite(xeCarbValue) || xeCarbValue <= 0) errors[`${prefix}-xe`] = t('errors.xeValue');
    if (!Number.isFinite(insulinRatio) || insulinRatio <= 0) errors[`${prefix}-ratio`] = t('errors.ratio');
    if (!isAllowedDoseStep(doseStep)) errors[`${prefix}-dose-step`] = t('errors.doseStep');

    return result(errors);
  }

  window.Validation = {
    parseNumber,
    validateProductInput,
    validateXeInput,
    validateSettings
  };
})();
