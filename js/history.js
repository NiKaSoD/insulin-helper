// history.js
// История подтверждённых записей: добавление, вывод, удаление и очистка.
(function () {
  function createHistoryEntry(data) {
    return {
      id: `entry_${Date.now()}_${Math.random().toString(16).slice(2)}`,
      dateTime: new Date().toISOString(),
      mode: data.mode,
      productGrams: data.productGrams ?? null,
      carbsPer100g: data.carbsPer100g ?? null,
      totalCarbs: data.totalCarbs,
      breadUnits: data.breadUnits,
      xeCarbValue: data.xeCarbValue,
      insulinRatio: data.insulinRatio,
      exactDose: data.exactDose,
      selectedDose: data.selectedDose,
      doseStep: data.doseStep
    };
  }

  function addHistoryEntry(entry) {
    const history = window.StorageService.loadHistory();
    history.unshift(entry);
    window.StorageService.saveHistory(history);
    renderLastHistory();
    renderFullHistory();
  }

  function getHistory() {
    return window.StorageService.loadHistory();
  }

  function getLastHistory(limit = 5) {
    return getHistory().slice(0, limit);
  }

  async function deleteHistoryEntry(id) {
    const confirmed = await window.UI.openConfirmDialog({
      title: window.UI.t('confirmAction.deleteEntryTitle'),
      text: window.UI.t('confirmAction.deleteEntryText'),
      confirmLabel: window.UI.t('actions.delete'),
      cancelLabel: window.UI.t('actions.cancel'),
      variant: 'danger'
    });

    if (!confirmed) return;

    const history = getHistory().filter((entry) => entry.id !== id);
    window.StorageService.saveHistory(history);
    renderLastHistory();
    renderFullHistory();
    window.UI.showToast(window.UI.t('messages.entryDeleted'), 'success');
  }

  function clearHistory() {
    window.StorageService.clearHistory();
    renderLastHistory();
    renderFullHistory();
  }

  function renderEmpty(container) {
    container.innerHTML = `<div class="empty-state empty-state--compact"><p>${window.UI.t('history.empty')}</p></div>`;
  }

  function renderHistoryCard(entry, { compact = false } = {}) {
    const mode = entry.mode === 'product' ? window.UI.t('history.modeProduct') : window.UI.t('history.modeXe');
    const meta = window.UI.t('history.carbsAndXe', {
      carbs: window.UI.formatNumber(entry.totalCarbs),
      xe: window.UI.formatNumber(entry.breadUnits)
    });
    const exact = window.UI.t('history.exact', { value: window.UI.formatNumber(entry.exactDose) });

    return `
      <article class="history-card" data-history-id="${entry.id}">
        <div class="history-card__top">
          <span>${window.UI.formatDate(entry.dateTime)}</span>
          <span>${mode}</span>
        </div>
        <div class="history-card__dose">${window.UI.formatNumber(entry.selectedDose)} ${window.UI.t('units.insulin')}</div>
        <div class="history-card__meta">${meta}</div>
        ${compact ? '' : `<div class="history-card__meta">${exact}</div>`}
        ${compact ? '' : `<div class="history-card__actions"><button class="button button--secondary button--small" type="button" data-delete-history="${entry.id}">${window.UI.t('actions.delete')}</button></div>`}
      </article>
    `;
  }

  function bindDeleteButtons(container) {
    container.querySelectorAll('[data-delete-history]').forEach((button) => {
      button.addEventListener('click', () => deleteHistoryEntry(button.dataset.deleteHistory));
    });
  }

  function renderLastHistory() {
    const containers = [
      document.getElementById('last-history-list'),
      document.getElementById('last-history-list-mobile')
    ].filter(Boolean);

    if (!containers.length) return;

    const entries = getLastHistory(5);
    containers.forEach((container) => {
      if (!entries.length) {
        renderEmpty(container);
        return;
      }
      container.innerHTML = entries.map((entry) => renderHistoryCard(entry, { compact: true })).join('');
    });
  }

  function renderFullHistory() {
    const container = document.getElementById('full-history-list');
    if (!container) return;
    const entries = getHistory();
    if (!entries.length) {
      renderEmpty(container);
      return;
    }
    container.innerHTML = entries.map((entry) => renderHistoryCard(entry)).join('');
    bindDeleteButtons(container);
  }

  window.HistoryService = {
    createHistoryEntry,
    addHistoryEntry,
    getHistory,
    getLastHistory,
    deleteHistoryEntry,
    clearHistory,
    renderLastHistory,
    renderFullHistory
  };
})();
