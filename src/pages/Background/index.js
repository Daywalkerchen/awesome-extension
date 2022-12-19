console.log('[BACKGROUND] Script loaded successfully');
chrome.storage.onChanged.addListener((changes) => {
  if (!changes.replacedPlaceholder || !changes.replacedPlaceholder.newValue) {
    chrome.action.setBadgeText({ text: '' });
    chrome.action.setBadgeBackgroundColor({ color: 'gray' });
  } else {
    // let the user know by how much the overall fun has been increased
    chrome.action.setBadgeText({ text: changes.replacedPlaceholder.newValue.toString() });
    chrome.action.setBadgeBackgroundColor({ color: 'gray' });
  }
});
