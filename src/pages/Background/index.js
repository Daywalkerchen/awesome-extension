console.log('[BACKGROUND] Script loaded successfully');
chrome.storage.onChanged.addListener((changes) => {
  const badgeText = changes.replacedPlaceholder?.newValue?.toString() || '';

  chrome.action.setBadgeBackgroundColor({ color: 'gray' });
  chrome.action.setBadgeText({ text: badgeText });
});
