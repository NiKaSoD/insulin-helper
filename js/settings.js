// settings.js
// Экран настроек: язык, тема, ХЕ, коэффициент, шаг дозы и удаление данных.
(function () {
  function elements() {
    return {
      language: document.getElementById('settings-language'),
      theme: document.getElementById('settings-theme'),
      ratio: document.getElementById('settings-ratio'),
      xe: document.getElementById('settings-xe'),
      doseStep: document.getElementById('settings-dose-step'),
      save: document.getElementById('save-settings-btn'),
      clearHistory: document.getElementById('clear-history-btn'),
      clearHistoryInline: document.getElementById('clear-history-inline-btn'),
      clearAll: document.getElementById('clear-all-data-btn')
    };
  }

  function renderSettings() {
    const settings = window.StorageService.loadSettings();
    const el = elements();
    if (el.language) el.language.value = settings.language || 'ru';
    if (el.theme) el.theme.value = settings.theme || 'dark';
    if (el.ratio) el.ratio.value = settings.insulinRatio;
    if (el.xe) el.xe.value = settings.xeCarbValue;
    if (el.doseStep) el.doseStep.value = String(settings.doseStep);
  }

  function updateSettingsSummary() {
    const settings = window.StorageService.loadSettings();
    const summaryXe = document.getElementById('summary-xe');
    const summaryRatio = document.getElementById('summary-ratio');
    const summaryStep = document.getElementById('summary-step');

    if (summaryXe) summaryXe.textContent = window.UI.formatNumber(settings.xeCarbValue);
    if (summaryRatio) summaryRatio.textContent = window.UI.formatNumber(settings.insulinRatio);
    if (summaryStep) summaryStep.textContent = window.UI.formatNumber(settings.doseStep);
  }

  function saveSettingsFromForm() {
    const el = elements();
    const data = {
      language: el.language.value,
      theme: el.theme.value,
      insulinRatio: window.Validation.parseNumber(el.ratio.value),
      xeCarbValue: window.Validation.parseNumber(el.xe.value),
      doseStep: window.Validation.parseNumber(el.doseStep.value)
    };

    const validation = window.Validation.validateSettings(data, 'settings');
    if (!validation.isValid) {
      window.UI.showFieldErrors(validation.fieldErrors);
      window.UI.showToast(window.UI.t('messages.fillSettings'), 'error');
      return;
    }

    const current = window.StorageService.loadSettings();
    window.StorageService.saveSettings({
      ...current,
      ...data,
      language: data.language || 'ru',
      theme: data.theme || 'dark'
    });

    window.UI.clearFieldErrors();
    window.UI.applyLanguage(data.language);
    window.UI.applyTheme(data.theme);
    renderSettings();
    updateSettingsSummary();
    window.HistoryService.renderLastHistory();
    window.HistoryService.renderFullHistory();
    window.UI.showToast(window.UI.t('messages.settingsSaved'), 'success');
    window.dispatchEvent(new CustomEvent('settingsupdated'));
  }

  async function handleClearHistory() {
    const confirmed = await window.UI.openConfirmDialog({
      title: window.UI.t('confirmAction.clearHistoryTitle'),
      text: window.UI.t('confirmAction.clearHistoryText'),
      confirmLabel: window.UI.t('actions.clearHistory'),
      cancelLabel: window.UI.t('actions.cancel'),
      variant: 'warning'
    });

    if (!confirmed) return;
    window.HistoryService.clearHistory();
    window.UI.showToast(window.UI.t('messages.historyCleared'), 'success');
  }

  async function handleClearAllData() {
    const confirmed = await window.UI.openConfirmDialog({
      title: window.UI.t('confirmAction.clearAllTitle'),
      text: window.UI.t('confirmAction.clearAllText'),
      confirmLabel: window.UI.t('actions.clearAllData'),
      cancelLabel: window.UI.t('actions.cancel'),
      variant: 'danger'
    });

    if (!confirmed) return;
    window.StorageService.clearAllData();
    window.UI.showToast(window.UI.t('messages.allDataCleared'), 'warning');
    window.setTimeout(() => window.location.reload(), 650);
  }

  function initSettings() {
    const el = elements();
    el.save?.addEventListener('click', saveSettingsFromForm);
    el.clearHistory?.addEventListener('click', handleClearHistory);
    el.clearHistoryInline?.addEventListener('click', handleClearHistory);
    el.clearAll?.addEventListener('click', handleClearAllData);
    renderSettings();
    updateSettingsSummary();
  }

  window.SettingsService = {
    initSettings,
    renderSettings,
    saveSettingsFromForm,
    updateSettingsSummary,
    handleClearHistory,
    handleClearAllData
  };
})();
