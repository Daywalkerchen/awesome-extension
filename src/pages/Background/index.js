// region Imports
import { BBBB_INSERT_DAILY_SCHELUDE_MESSAGE } from '../../const/messages';
// endregion

console.log('[BACKGROUND] Script loaded successfully');
// region badge text

chrome.storage.onChanged.addListener((changes) => {
  const badgeText = changes.replacedPlaceholder?.newValue?.toString() || '';

  chrome.action.setBadgeBackgroundColor({ color: 'gray' });
  chrome.action.setBadgeText({ text: badgeText });
});

// endregion

//region context menue

const scheduleContextMenueId = 'bbbbDailySchedule';

chrome.contextMenus.removeAll(function () {
  chrome.contextMenus.create({
    id: scheduleContextMenueId,
    // todo exact urls to enable BBBB to settings
    documentUrlPatterns: ['https://*/html5client/join*'],
    title: 'Insert Daily Schedule',
    contexts: ['editable'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== scheduleContextMenueId) {
    return;
  }

  chrome.tabs.sendMessage(tab.id, BBBB_INSERT_DAILY_SCHELUDE_MESSAGE);
});

// endregion
