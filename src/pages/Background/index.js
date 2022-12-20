// region Imports
import './contextMenu';
// endregion

console.log('[BACKGROUND] Script loaded successfully');

// region badge text
chrome.storage.onChanged.addListener((changes) => {
  const badgeText = changes.replacedPlaceholder?.newValue?.toString() || '';

  chrome.action.setBadgeBackgroundColor({ color: 'gray' });
  chrome.action.setBadgeText({ text: badgeText });
});
// endregion
