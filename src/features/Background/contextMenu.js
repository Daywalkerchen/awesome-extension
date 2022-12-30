// region Imports
import { BBBB_INSERT_DAILY_SCHEDULE_MESSAGE } from '../../const/messages';
// endregion

// region Constants
const scheduleContextMenuId = 'bbbbDailySchedule';
// endregion

chrome.contextMenus.removeAll(() => {
  chrome.contextMenus.create({
    id: scheduleContextMenuId,
    documentUrlPatterns: ['https://*/html5client/join*'],
    title: 'Insert Daily Schedule',
    contexts: ['editable'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== scheduleContextMenuId) {
    return;
  }

  chrome.tabs.sendMessage(tab.id, BBBB_INSERT_DAILY_SCHEDULE_MESSAGE);
});
