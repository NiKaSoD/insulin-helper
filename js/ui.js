// ui.js
// Интерфейс: переводы, навигация SPA, темы, toast-уведомления и ошибки полей.
(function () {
  const translations = {
    ru: {
      'app.name': 'Инсулин помощник',
      'app.subtitle': 'Локальный расчёт ХЕ',
      'nav.calculator': 'Калькулятор',
      'nav.history': 'История',
      'nav.settings': 'Настройки',
      'nav.about': 'О приложении',
      'privacy.title': 'Приватность',
      'privacy.text': 'Данные хранятся только в этом браузере на этом устройстве.',
      'calculator.eyebrow': 'Калькулятор',
      'calculator.title': 'Вспомогательный расчёт по вашим коэффициентам',
      'calculator.description': 'Коэффициент и значение хлебной единицы задаются при первом запуске и меняются только в настройках.',
      'calculator.cardTitle': 'Расчёт',
      'calculator.cardText': 'Выберите режим и введите данные о продукте или количестве ХЕ.',
      'calculator.byProduct': 'По продукту',
      'calculator.byXe': 'По ХЕ',
      'settingsSummary.xe': '1 ХЕ',
      'settingsSummary.ratio': 'Коэффициент',
      'settingsSummary.step': 'Шаг дозы',
      'units.carbs': 'г углеводов',
      'units.insulinPerXe': 'ед / 1 ХЕ',
      'units.insulin': 'ед.',
      'fields.grams': 'Граммовка продукта',
      'fields.carbsPer100': 'Углеводы на 100 г',
      'fields.breadUnits': 'Количество ХЕ',
      'placeholders.grams': 'Например, 250',
      'placeholders.carbs': 'Например, 13.5',
      'placeholders.xe': 'Например, 4',
      'actions.calculateProduct': 'Рассчитать по продукту',
      'actions.calculateXe': 'Рассчитать по ХЕ',
      'actions.continue': 'Продолжить',
      'actions.startUsing': 'Начать пользоваться',
      'actions.saveSettings': 'Сохранить настройки',
      'actions.clearHistory': 'Очистить историю',
      'actions.clearAllData': 'Удалить все данные',
      'actions.confirmSave': 'Подтвердить и сохранить',
      'actions.cancel': 'Отмена',
      'actions.confirm': 'Подтвердить',
      'actions.delete': 'Удалить',
      'actions.chooseDose': 'Выбрать {value} ед.',
      'actions.chooseNearest': 'Выбрать ближайшее {value} ед.',
      'result.title': 'Результат расчёта',
      'result.subtitle': 'Результат расположен сразу под формой расчёта.',
      'result.totalCarbs': 'Углеводы',
      'result.breadUnits': 'ХЕ',
      'result.exactDose': 'Точный расчёт',
      'result.nearestDose': 'Математически ближе',
      'result.lower': 'Нижний вариант',
      'result.upper': 'Верхний вариант',
      'result.nearest': 'Ближайшее значение',
      'result.lessBy': 'меньше расчёта на {value} ед.',
      'result.moreBy': 'больше расчёта на {value} ед.',
      'result.exactMatch': 'совпадает с точным расчётом',
      'safety.shortWarning': 'Сайт не назначает дозу инсулина. Фактическое решение пользователь принимает самостоятельно по рекомендациям врача.',
      'history.eyebrow': 'История',
      'history.title': 'Подтверждённые записи',
      'history.description': 'Здесь сохраняются только те значения, которые были подтверждены пользователем.',
      'history.allTitle': 'Вся история',
      'history.allSubtitle': 'Локальные записи этого браузера.',
      'history.lastTitle': 'Последние 5 уколов',
      'history.lastSubtitle': 'Подтверждённые записи.',
      'history.allButton': 'Вся история',
      'history.empty': 'История пока пуста.',
      'history.modeProduct': 'по продукту',
      'history.modeXe': 'по ХЕ',
      'history.carbsAndXe': '{carbs} г углеводов · {xe} ХЕ',
      'history.exact': 'Точный расчёт: {value} ед.',
      'settings.eyebrow': 'Настройки',
      'settings.title': 'Личные коэффициенты и параметры',
      'settings.description': 'Эти значения используются в калькуляторе как постоянные параметры.',
      'settings.parametersTitle': 'Параметры расчёта',
      'settings.parametersText': 'Изменения применятся к следующим расчётам. Старые записи истории не пересчитываются.',
      'settings.language': 'Язык',
      'settings.theme': 'Тема',
      'settings.ratio': 'Основной коэффициент, ед / 1 ХЕ',
      'settings.xeValue': '1 ХЕ, г углеводов',
      'settings.doseStep': 'Шаг дозы',
      'settings.dataTitle': 'Данные',
      'settings.dataText': 'Удаление работает только для данных в этом браузере.',
      'theme.dark': 'Тёмная',
      'theme.light': 'Светлая',
      'about.eyebrow': 'О приложении',
      'about.p1': 'Это статический сайт без backend и базы данных. Все настройки и история хранятся локально в браузере пользователя.',
      'about.p2': 'Приложение не заменяет врача и не назначает дозу инсулина. Оно предназначено только для прозрачного математического расчёта по данным пользователя.',
      'about.formulasTitle': 'Формулы расчёта',
      'about.productFormulaTitle': 'Расчёт по продукту',
      'about.xeFormulaTitle': 'Расчёт по ХЕ',
      'about.roundingTitle': 'Округление',
      'about.formulaCarbs': 'углеводы = граммовка продукта × углеводы на 100 г / 100',
      'about.formulaXe': 'ХЕ = углеводы / грамм углеводов в 1 ХЕ',
      'about.formulaDose': 'точный расчёт = ХЕ × коэффициент инсулина на 1 ХЕ',
      'about.formulaDoseXe': 'точный расчёт = ХЕ × коэффициент инсулина на 1 ХЕ',
      'about.roundingFormula': 'нижний и верхний варианты рассчитываются по выбранному шагу дозы',
      'about.roundingText': 'Сайт показывает математически ближайшее значение, но фактическую дозу пользователь выбирает самостоятельно.',
      'onboarding.stepAgreement': 'Безопасность',
      'onboarding.agreementTitle': 'Важное предупреждение',
      'onboarding.agreementText': 'Этот сайт не назначает дозу инсулина и не заменяет врача. Расчёт выполняется только по коэффициентам, которые пользователь вводит самостоятельно. Не используйте сайт при плохом самочувствии, гипогликемии или если расчёт кажется необычным.',
      'onboarding.agreementCheck': 'Я понимаю, что сайт выполняет только математический расчёт и не заменяет врача.',
      'onboarding.stepSetup': 'Первичная настройка',
      'onboarding.setupTitle': 'Введите ваши значения',
      'onboarding.setupText': 'Эти параметры будут использоваться в калькуляторе. Позже их можно изменить только в настройках.',
      'confirm.eyebrow': 'Проверка перед сохранением',
      'confirm.title': 'Подтверждение фактической дозы',
      'confirm.text': 'Проверьте крупное значение ниже. Если оно не соответствует выбранной фактической дозе, отмените действие.',
      'confirmAction.eyebrow': 'Подтверждение',
      'confirmAction.clearHistoryTitle': 'Очистить историю?',
      'confirmAction.clearHistoryText': 'Все записи инъекций в этом браузере будут удалены. Настройки останутся без изменений.',
      'confirmAction.clearAllTitle': 'Удалить все данные?',
      'confirmAction.clearAllText': 'Будут удалены настройки, выбранный язык, соглашение и вся история. После этого сайт откроется как при первом запуске.',
      'confirmAction.deleteEntryTitle': 'Удалить запись?',
      'confirmAction.deleteEntryText': 'Эта запись будет удалена из истории. Остальные записи останутся на месте.',
      'errors.grams': 'Введите граммовку продукта больше 0.',
      'errors.carbs': 'Углеводы на 100 г должны быть от 0 до 100.',
      'errors.breadUnits': 'Введите количество ХЕ больше 0.',
      'errors.xeValue': 'Значение 1 ХЕ должно быть больше 0.',
      'errors.ratio': 'Коэффициент должен быть больше 0.',
      'errors.doseStep': 'Выберите допустимый шаг дозы.',
      'messages.settingsSaved': 'Настройки сохранены.',
      'messages.historyCleared': 'История очищена.',
      'messages.allDataCleared': 'Все данные удалены.',
      'messages.entrySaved': 'Запись сохранена в историю.',
      'messages.entryDeleted': 'Запись удалена.',
      'messages.calculateFirst': 'Сначала выполните расчёт.',
      'messages.confirmClearHistory': 'Очистить всю историю?',
      'messages.confirmClearAll': 'Удалить все данные сайта в этом браузере?',
      'messages.fillSettings': 'Проверьте значения настроек.',
      'messages.fillCalculation': 'Проверьте данные для расчёта.'
    },
    en: {
      'app.name': 'Insulin Helper',
      'app.subtitle': 'Local BU calculator',
      'nav.calculator': 'Calculator',
      'nav.history': 'History',
      'nav.settings': 'Settings',
      'nav.about': 'About',
      'privacy.title': 'Privacy',
      'privacy.text': 'Data is stored only in this browser on this device.',
      'calculator.eyebrow': 'Calculator',
      'calculator.title': 'Supportive calculation using your personal values',
      'calculator.description': 'Your insulin ratio and bread unit value are set during first launch and can be changed only in Settings.',
      'calculator.cardTitle': 'Calculation',
      'calculator.cardText': 'Choose a mode and enter product data or bread units.',
      'calculator.byProduct': 'By product',
      'calculator.byXe': 'By BU',
      'settingsSummary.xe': '1 BU',
      'settingsSummary.ratio': 'Ratio',
      'settingsSummary.step': 'Dose step',
      'units.carbs': 'g carbs',
      'units.insulinPerXe': 'U / 1 BU',
      'units.insulin': 'U',
      'fields.grams': 'Product weight',
      'fields.carbsPer100': 'Carbs per 100 g',
      'fields.breadUnits': 'Bread units',
      'placeholders.grams': 'For example, 250',
      'placeholders.carbs': 'For example, 13.5',
      'placeholders.xe': 'For example, 4',
      'actions.calculateProduct': 'Calculate by product',
      'actions.calculateXe': 'Calculate by BU',
      'actions.continue': 'Continue',
      'actions.startUsing': 'Start using',
      'actions.saveSettings': 'Save settings',
      'actions.clearHistory': 'Clear history',
      'actions.clearAllData': 'Delete all data',
      'actions.confirmSave': 'Confirm and save',
      'actions.cancel': 'Cancel',
      'actions.confirm': 'Confirm',
      'actions.delete': 'Delete',
      'actions.chooseDose': 'Choose {value} U',
      'actions.chooseNearest': 'Choose nearest {value} U',
      'result.title': 'Calculation result',
      'result.subtitle': 'The result is shown directly under the calculation form.',
      'result.totalCarbs': 'Carbs',
      'result.breadUnits': 'BU',
      'result.exactDose': 'Exact calculation',
      'result.nearestDose': 'Mathematically nearest',
      'result.lower': 'Lower option',
      'result.upper': 'Upper option',
      'result.nearest': 'Nearest value',
      'result.lessBy': '{value} U below the calculation',
      'result.moreBy': '{value} U above the calculation',
      'result.exactMatch': 'matches the exact calculation',
      'safety.shortWarning': 'This site does not prescribe insulin. The final decision is made by the user according to medical guidance.',
      'history.eyebrow': 'History',
      'history.title': 'Confirmed entries',
      'history.description': 'Only values confirmed by the user are stored here.',
      'history.allTitle': 'Full history',
      'history.allSubtitle': 'Local entries in this browser.',
      'history.lastTitle': 'Last 5 injections',
      'history.lastSubtitle': 'Confirmed entries.',
      'history.allButton': 'Full history',
      'history.empty': 'History is empty.',
      'history.modeProduct': 'by product',
      'history.modeXe': 'by BU',
      'history.carbsAndXe': '{carbs} g carbs · {xe} BU',
      'history.exact': 'Exact calculation: {value} U',
      'settings.eyebrow': 'Settings',
      'settings.title': 'Personal values and parameters',
      'settings.description': 'These values are used as fixed parameters in the calculator.',
      'settings.parametersTitle': 'Calculation parameters',
      'settings.parametersText': 'Changes will apply to future calculations. Existing history entries are not recalculated.',
      'settings.language': 'Language',
      'settings.theme': 'Theme',
      'settings.ratio': 'Main ratio, U / 1 BU',
      'settings.xeValue': '1 BU, grams of carbs',
      'settings.doseStep': 'Dose step',
      'settings.dataTitle': 'Data',
      'settings.dataText': 'Deletion affects only data stored in this browser.',
      'theme.dark': 'Dark',
      'theme.light': 'Light',
      'about.eyebrow': 'About',
      'about.p1': 'This is a static website with no backend and no database. All settings and history are stored locally in the user’s browser.',
      'about.p2': 'The app does not replace a doctor and does not prescribe insulin. It is intended only for transparent mathematical calculation using user-provided data.',
      'about.formulasTitle': 'Calculation formulas',
      'about.productFormulaTitle': 'Product calculation',
      'about.xeFormulaTitle': 'BU calculation',
      'about.roundingTitle': 'Rounding',
      'about.formulaCarbs': 'carbs = product weight × carbs per 100 g / 100',
      'about.formulaXe': 'BU = carbs / grams of carbs in 1 BU',
      'about.formulaDose': 'exact calculation = BU × insulin ratio per 1 BU',
      'about.formulaDoseXe': 'exact calculation = BU × insulin ratio per 1 BU',
      'about.roundingFormula': 'lower and upper options are calculated using the selected dose step',
      'about.roundingText': 'The site shows the mathematically nearest value, but the actual dose is chosen by the user.',
      'onboarding.stepAgreement': 'Safety',
      'onboarding.agreementTitle': 'Important warning',
      'onboarding.agreementText': 'This site does not prescribe insulin and does not replace a doctor. The calculation is performed only with values entered by the user. Do not use it if you feel unwell, have hypoglycemia, or if the result seems unusual.',
      'onboarding.agreementCheck': 'I understand that the site performs only a mathematical calculation and does not replace a doctor.',
      'onboarding.stepSetup': 'Initial setup',
      'onboarding.setupTitle': 'Enter your values',
      'onboarding.setupText': 'These parameters will be used in the calculator. Later they can be changed only in Settings.',
      'confirm.eyebrow': 'Check before saving',
      'confirm.title': 'Confirm actual dose',
      'confirm.text': 'Check the large value below. If it does not match the actual dose you selected, cancel this action.',
      'confirmAction.eyebrow': 'Confirmation',
      'confirmAction.clearHistoryTitle': 'Clear history?',
      'confirmAction.clearHistoryText': 'All injection entries in this browser will be deleted. Settings will stay unchanged.',
      'confirmAction.clearAllTitle': 'Delete all data?',
      'confirmAction.clearAllText': 'Settings, selected language, agreement and all history will be deleted. The site will open like the first launch again.',
      'confirmAction.deleteEntryTitle': 'Delete entry?',
      'confirmAction.deleteEntryText': 'This entry will be removed from history. Other entries will stay in place.',
      'errors.grams': 'Enter product weight greater than 0.',
      'errors.carbs': 'Carbs per 100 g must be from 0 to 100.',
      'errors.breadUnits': 'Enter bread units greater than 0.',
      'errors.xeValue': 'The BU value must be greater than 0.',
      'errors.ratio': 'The ratio must be greater than 0.',
      'errors.doseStep': 'Choose a valid dose step.',
      'messages.settingsSaved': 'Settings saved.',
      'messages.historyCleared': 'History cleared.',
      'messages.allDataCleared': 'All data deleted.',
      'messages.entrySaved': 'Entry saved to history.',
      'messages.entryDeleted': 'Entry deleted.',
      'messages.calculateFirst': 'Run a calculation first.',
      'messages.confirmClearHistory': 'Clear the full history?',
      'messages.confirmClearAll': 'Delete all site data in this browser?',
      'messages.fillSettings': 'Check your settings values.',
      'messages.fillCalculation': 'Check the calculation input.'
    }
  };

  let currentLanguage = 'ru';

  function interpolate(text, params = {}) {
    return Object.entries(params).reduce((acc, [key, value]) => acc.replaceAll(`{${key}}`, value), text);
  }

  function t(key, params = {}) {
    const value = translations[currentLanguage]?.[key] || translations.ru[key] || key;
    return interpolate(value, params);
  }

  function applyLanguage(language) {
    currentLanguage = translations[language] ? language : 'ru';
    document.documentElement.lang = currentLanguage;
    document.title = t('app.name');

    document.querySelectorAll('[data-i18n]').forEach((element) => {
      element.textContent = t(element.dataset.i18n);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
      element.setAttribute('placeholder', t(element.dataset.i18nPlaceholder));
    });
  }

  function applyTheme(theme) {
    document.body.classList.toggle('theme-light', theme === 'light');
  }

  function initNavigation() {
    document.querySelectorAll('[data-screen]').forEach((button) => {
      button.addEventListener('click', () => showScreen(button.dataset.screen));
    });
  }

  function showScreen(screenName) {
    document.querySelectorAll('[data-app-screen]').forEach((screen) => {
      screen.classList.toggle('is-hidden', screen.dataset.appScreen !== screenName);
    });

    document.querySelectorAll('[data-screen]').forEach((button) => {
      button.classList.toggle('active', button.dataset.screen === screenName);
    });

    window.dispatchEvent(new CustomEvent('screenchange', { detail: { screenName } }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openModal(id) {
    document.getElementById(id)?.classList.remove('is-hidden');
  }

  function closeModal(id) {
    document.getElementById(id)?.classList.add('is-hidden');
  }

  let confirmDialogResolve = null;
  let confirmDialogListenersReady = false;

  function ensureConfirmDialogListeners() {
    if (confirmDialogListenersReady) return;
    const acceptButton = document.getElementById('action-confirm-accept');
    const cancelButton = document.getElementById('action-confirm-cancel');
    const backdrop = document.querySelector('[data-action-confirm-cancel]');

    const close = (result) => {
      closeModal('action-confirm-modal');
      if (confirmDialogResolve) {
        confirmDialogResolve(result);
        confirmDialogResolve = null;
      }
    };

    acceptButton?.addEventListener('click', () => close(true));
    cancelButton?.addEventListener('click', () => close(false));
    backdrop?.addEventListener('click', () => close(false));
    confirmDialogListenersReady = true;
  }

  function openConfirmDialog({
    title,
    text,
    confirmLabel,
    cancelLabel,
    variant = 'warning'
  } = {}) {
    ensureConfirmDialogListeners();

    const modal = document.getElementById('action-confirm-modal');
    const content = modal?.querySelector('.action-confirm-modal');
    const eyebrow = document.getElementById('action-confirm-eyebrow');
    const titleElement = document.getElementById('action-confirm-title');
    const textElement = document.getElementById('action-confirm-text');
    const acceptButton = document.getElementById('action-confirm-accept');
    const cancelButton = document.getElementById('action-confirm-cancel');

    if (!modal || !content || !titleElement || !textElement || !acceptButton || !cancelButton) {
      return Promise.resolve(window.confirm(text || title || t('actions.confirm')));
    }

    content.classList.toggle('is-danger', variant === 'danger');
    if (eyebrow) eyebrow.textContent = t('confirmAction.eyebrow');
    titleElement.textContent = title || t('actions.confirm');
    textElement.textContent = text || '';
    acceptButton.textContent = confirmLabel || t('actions.confirm');
    cancelButton.textContent = cancelLabel || t('actions.cancel');
    acceptButton.className = `button ${variant === 'danger' ? 'button--danger' : 'button--primary'}`;

    openModal('action-confirm-modal');

    return new Promise((resolve) => {
      confirmDialogResolve = resolve;
    });
  }

  function clearFieldErrors() {
    document.querySelectorAll('.field.has-error').forEach((field) => field.classList.remove('has-error'));
    document.querySelectorAll('.field-error').forEach((error) => {
      error.textContent = '';
    });
  }

  function showFieldErrors(fieldErrors = {}) {
    clearFieldErrors();
    Object.entries(fieldErrors).forEach(([inputId, message]) => {
      const input = document.getElementById(inputId);
      const field = input?.closest('.field');
      const error = document.querySelector(`[data-error-for="${inputId}"]`);
      field?.classList.add('has-error');
      if (error) error.textContent = message;
    });
  }

  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    window.setTimeout(() => {
      toast.remove();
    }, 3600);
  }

  function formatNumber(value, digits = 2) {
    const number = Number(value);
    if (!Number.isFinite(number)) return '—';
    return new Intl.NumberFormat(currentLanguage === 'en' ? 'en-US' : 'ru-RU', {
      maximumFractionDigits: digits,
      minimumFractionDigits: 0
    }).format(number);
  }

  function formatDate(dateTime) {
    const date = new Date(dateTime);
    const locale = currentLanguage === 'en' ? 'en-US' : 'ru-RU';
    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  function getCurrentLanguage() {
    return currentLanguage;
  }

  window.UI = {
    t,
    applyLanguage,
    applyTheme,
    initNavigation,
    showScreen,
    openModal,
    closeModal,
    openConfirmDialog,
    clearFieldErrors,
    showFieldErrors,
    showToast,
    formatNumber,
    formatDate,
    getCurrentLanguage
  };
})();
