// safety.js
// Первый запуск: выбор языка, предупреждение безопасности и первичная настройка.
(function () {
  function showStep(stepName) {
    document.querySelectorAll('[data-onboarding-step]').forEach((step) => {
      step.classList.toggle('is-hidden', step.dataset.onboardingStep !== stepName);
    });
  }

  function openNeededStep() {
    const settings = window.StorageService.loadSettings();
    if (!settings.language) {
      showStep('language');
    } else if (!settings.disclaimerAccepted) {
      window.UI.applyLanguage(settings.language);
      showStep('agreement');
    } else if (!settings.firstSetupCompleted) {
      window.UI.applyLanguage(settings.language);
      showStep('setup');
    }
    window.UI.openModal('onboarding-modal');
  }

  function needsOnboarding() {
    const settings = window.StorageService.loadSettings();
    return !settings.language || !settings.disclaimerAccepted || !settings.firstSetupCompleted;
  }

  function initOnboarding() {
    const modal = document.getElementById('onboarding-modal');
    const agreementCheckbox = document.getElementById('agreement-checkbox');
    const agreementNextBtn = document.getElementById('agreement-next-btn');
    const finishBtn = document.getElementById('finish-onboarding-btn');
    const xeInput = document.getElementById('onboarding-xe');
    const ratioInput = document.getElementById('onboarding-ratio');

    document.querySelectorAll('[data-language-choice]').forEach((button) => {
      button.addEventListener('click', () => {
        const language = button.dataset.languageChoice;
        window.StorageService.saveSettings({ language });
        window.UI.applyLanguage(language);
        showStep('agreement');
      });
    });

    agreementCheckbox?.addEventListener('change', () => {
      agreementNextBtn.disabled = !agreementCheckbox.checked;
    });

    agreementNextBtn?.addEventListener('click', () => {
      const settings = window.StorageService.loadSettings();
      window.StorageService.saveSettings({ ...settings, disclaimerAccepted: true });
      showStep('setup');
    });

    finishBtn?.addEventListener('click', () => {
      const current = window.StorageService.loadSettings();
      const data = {
        xeCarbValue: window.Validation.parseNumber(xeInput.value),
        insulinRatio: window.Validation.parseNumber(ratioInput.value),
        doseStep: current.doseStep || 1
      };
      const validation = window.Validation.validateSettings(data, 'onboarding');

      if (!validation.isValid) {
        window.UI.showFieldErrors(validation.fieldErrors);
        window.UI.showToast(window.UI.t('messages.fillSettings'), 'error');
        return;
      }

      window.StorageService.saveSettings({
        ...current,
        xeCarbValue: data.xeCarbValue,
        insulinRatio: data.insulinRatio,
        doseStep: data.doseStep,
        disclaimerAccepted: true,
        firstSetupCompleted: true
      });

      window.UI.clearFieldErrors();
      window.UI.closeModal('onboarding-modal');
      window.dispatchEvent(new CustomEvent('settingsupdated'));
    });

    if (needsOnboarding()) {
      const defaults = window.StorageService.getDefaultSettings();
      xeInput.value = defaults.xeCarbValue;
      ratioInput.value = defaults.insulinRatio;
      openNeededStep();
    } else {
      modal?.classList.add('is-hidden');
    }
  }

  window.Safety = {
    initOnboarding,
    needsOnboarding
  };
})();
