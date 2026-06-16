// storage.js
// Работа с localStorage: настройки, история и полная очистка локальных данных.
(function () {
  const STORAGE_KEYS = {
    settings: 'insulinHelper.settings',
    history: 'insulinHelper.history'
  };

  const defaultSettings = {
    language: null,
    disclaimerAccepted: false,
    firstSetupCompleted: false,
    theme: 'dark',
    xeCarbValue: 12,
    insulinRatio: 1.5,
    doseStep: 1
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function safeParse(raw, fallback) {
    try {
      if (!raw) return clone(fallback);
      const parsed = JSON.parse(raw);
      return parsed ?? clone(fallback);
    } catch (error) {
      console.warn('LocalStorage parse error:', error);
      return clone(fallback);
    }
  }

  function loadSettings() {
    const parsed = safeParse(localStorage.getItem(STORAGE_KEYS.settings), defaultSettings);
    return {
      ...clone(defaultSettings),
      ...parsed,
      xeCarbValue: Number(parsed.xeCarbValue || defaultSettings.xeCarbValue),
      insulinRatio: Number(parsed.insulinRatio || defaultSettings.insulinRatio),
      doseStep: Number(parsed.doseStep || defaultSettings.doseStep)
    };
  }

  function saveSettings(settings) {
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify({
      ...loadSettings(),
      ...settings
    }));
  }

  function getDefaultSettings() {
    return clone(defaultSettings);
  }

  function loadHistory() {
    const parsed = safeParse(localStorage.getItem(STORAGE_KEYS.history), []);
    return Array.isArray(parsed) ? parsed : [];
  }

  function saveHistory(history) {
    localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(Array.isArray(history) ? history : []));
  }

  function clearHistory() {
    localStorage.removeItem(STORAGE_KEYS.history);
  }

  function clearAllData() {
    localStorage.removeItem(STORAGE_KEYS.settings);
    localStorage.removeItem(STORAGE_KEYS.history);
  }

  window.StorageService = {
    STORAGE_KEYS,
    loadSettings,
    saveSettings,
    getDefaultSettings,
    loadHistory,
    saveHistory,
    clearHistory,
    clearAllData
  };
})();
