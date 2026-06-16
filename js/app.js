// app.js
// Главная точка входа: связывает интерфейс, расчёты, настройки и историю.
(function () {
  let currentMode = 'product';
  let lastCalculation = null;
  let pendingSelectedDose = null;

  function getSettings() {
    return window.StorageService.loadSettings();
  }

  function initCalculatorModeSwitch() {
    const buttons = document.querySelectorAll('[data-calc-mode]');
    const forms = document.querySelectorAll('[data-form]');

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        currentMode = button.dataset.calcMode;
        buttons.forEach((item) => item.classList.toggle('active', item === button));
        forms.forEach((form) => form.classList.toggle('is-hidden', form.dataset.form !== currentMode));
        hideResult();
      });
    });
  }

  function hideResult() {
    document.getElementById('result-section')?.classList.add('is-hidden');
  }

  function showCalculationError(validation) {
    window.UI.showFieldErrors(validation.fieldErrors);
    window.UI.showToast(window.UI.t('messages.fillCalculation'), 'error');
  }

  function setMetric(id, value, unit = '') {
    const element = document.getElementById(id);
    if (!element) return;
    element.textContent = `${window.UI.formatNumber(value)}${unit ? ` ${unit}` : ''}`;
  }

  function renderDoseOptions(options) {
    const container = document.getElementById('dose-options');
    if (!container) return;

    const cards = [];
    const sameOption = Number(options.lower) === Number(options.upper);

    if (sameOption) {
      cards.push({
        title: window.UI.t('result.nearest'),
        value: options.nearest,
        note: window.UI.t('result.exactMatch'),
        primary: true
      });
    } else {
      cards.push({
        title: window.UI.t('result.lower'),
        value: options.lower,
        note: window.UI.t('result.lessBy', { value: window.UI.formatNumber(options.lowerDiff) }),
        primary: Number(options.nearest) === Number(options.lower)
      });
      cards.push({
        title: window.UI.t('result.upper'),
        value: options.upper,
        note: window.UI.t('result.moreBy', { value: window.UI.formatNumber(options.upperDiff) }),
        primary: Number(options.nearest) === Number(options.upper)
      });
    }

    container.innerHTML = cards.map((card) => `
      <article class="dose-option-card">
        <span>${card.title}</span>
        <strong>${window.UI.formatNumber(card.value)} ${window.UI.t('units.insulin')}</strong>
        <span>${card.note}</span>
        <button class="button ${card.primary ? 'button--primary' : 'button--secondary'}" type="button" data-select-dose="${card.value}">
          ${card.primary
            ? window.UI.t('actions.chooseNearest', { value: window.UI.formatNumber(card.value) })
            : window.UI.t('actions.chooseDose', { value: window.UI.formatNumber(card.value) })}
        </button>
      </article>
    `).join('');

    container.querySelectorAll('[data-select-dose]').forEach((button) => {
      button.addEventListener('click', () => openDoseConfirmation(Number(button.dataset.selectDose)));
    });
  }

  function renderResult(calculation, options, mode, sourceData) {
    lastCalculation = {
      mode,
      sourceData,
      result: calculation,
      options,
      settings: getSettings()
    };

    setMetric('result-carbs', calculation.totalCarbs, window.UI.t('units.carbs'));
    setMetric('result-xe', calculation.breadUnits);
    setMetric('result-exact', calculation.exactDose, window.UI.t('units.insulin'));
    setMetric('result-nearest', options.nearest, window.UI.t('units.insulin'));
    renderDoseOptions(options);

    const resultSection = document.getElementById('result-section');
    resultSection?.classList.remove('is-hidden');
    window.requestAnimationFrame(() => {
      resultSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      resultSection?.focus({ preventScroll: true });
    });
  }

  function handleProductCalculation(event) {
    event.preventDefault();
    const settings = getSettings();
    const data = {
      grams: window.Validation.parseNumber(document.getElementById('product-grams').value),
      carbsPer100: window.Validation.parseNumber(document.getElementById('product-carbs').value),
      xeCarbValue: settings.xeCarbValue,
      insulinRatio: settings.insulinRatio,
      doseStep: settings.doseStep
    };

    const validation = window.Validation.validateProductInput(data);
    if (!validation.isValid) {
      showCalculationError(validation);
      return;
    }

    window.UI.clearFieldErrors();
    const calculation = window.Calculator.calculateByProduct(data);
    const options = window.Calculator.getDoseOptions(calculation.exactDose, settings.doseStep);
    renderResult(calculation, options, 'product', data);
  }

  function handleXeCalculation(event) {
    event.preventDefault();
    const settings = getSettings();
    const data = {
      breadUnits: window.Validation.parseNumber(document.getElementById('xe-count').value),
      xeCarbValue: settings.xeCarbValue,
      insulinRatio: settings.insulinRatio,
      doseStep: settings.doseStep
    };

    const validation = window.Validation.validateXeInput(data);
    if (!validation.isValid) {
      showCalculationError(validation);
      return;
    }

    window.UI.clearFieldErrors();
    const calculation = window.Calculator.calculateByXe(data);
    const options = window.Calculator.getDoseOptions(calculation.exactDose, settings.doseStep);
    renderResult(calculation, options, 'xe', data);
  }

  function openDoseConfirmation(selectedDose) {
    if (!lastCalculation) {
      window.UI.showToast(window.UI.t('messages.calculateFirst'), 'warning');
      return;
    }

    pendingSelectedDose = window.Calculator.roundTo(selectedDose, 2);
    const value = document.getElementById('confirm-dose-value');
    if (value) value.textContent = window.UI.formatNumber(pendingSelectedDose);
    window.UI.openModal('confirm-dose-modal');
  }

  function closeDoseConfirmation() {
    pendingSelectedDose = null;
    window.UI.closeModal('confirm-dose-modal');
  }

  function saveConfirmedDose() {
    if (!lastCalculation || pendingSelectedDose === null) {
      closeDoseConfirmation();
      return;
    }

    const { mode, sourceData, result, settings } = lastCalculation;
    const entry = window.HistoryService.createHistoryEntry({
      mode,
      productGrams: mode === 'product' ? sourceData.grams : null,
      carbsPer100g: mode === 'product' ? sourceData.carbsPer100 : null,
      totalCarbs: result.totalCarbs,
      breadUnits: result.breadUnits,
      xeCarbValue: settings.xeCarbValue,
      insulinRatio: settings.insulinRatio,
      exactDose: result.exactDose,
      selectedDose: pendingSelectedDose,
      doseStep: settings.doseStep
    });

    window.HistoryService.addHistoryEntry(entry);
    window.UI.showToast(window.UI.t('messages.entrySaved'), 'success');
    closeDoseConfirmation();
  }

  function initConfirmationModal() {
    document.getElementById('confirm-save-btn')?.addEventListener('click', saveConfirmedDose);
    document.getElementById('confirm-cancel-btn')?.addEventListener('click', closeDoseConfirmation);
    document.querySelector('[data-close-confirm]')?.addEventListener('click', closeDoseConfirmation);
  }

  function initCalculatorForms() {
    initCalculatorModeSwitch();
    document.getElementById('product-form')?.addEventListener('submit', handleProductCalculation);
    document.getElementById('xe-form')?.addEventListener('submit', handleXeCalculation);
  }

  function applySavedPreferences() {
    const settings = getSettings();
    window.UI.applyLanguage(settings.language || 'ru');
    window.UI.applyTheme(settings.theme || 'dark');
  }

  function initScreenHooks() {
    window.addEventListener('screenchange', (event) => {
      if (event.detail.screenName === 'history') {
        window.HistoryService.renderFullHistory();
      }
      if (event.detail.screenName === 'settings') {
        window.SettingsService.renderSettings();
      }
    });

    window.addEventListener('settingsupdated', () => {
      applySavedPreferences();
      window.SettingsService.updateSettingsSummary();
      window.SettingsService.renderSettings();
      window.HistoryService.renderLastHistory();
      window.HistoryService.renderFullHistory();
      hideResult();
    });
  }

  function initApp() {
    applySavedPreferences();
    window.UI.initNavigation();
    window.SettingsService.initSettings();
    window.HistoryService.renderLastHistory();
    window.HistoryService.renderFullHistory();
    initCalculatorForms();
    initConfirmationModal();
    initScreenHooks();
    window.Safety.initOnboarding();
    window.UI.showScreen('calculator');
  }

  document.addEventListener('DOMContentLoaded', initApp);
})();
