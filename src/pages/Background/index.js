chrome.storage.onChanged.addListener((changes) => {
    // let the user know by how much the overall fun has been increased
    chrome.action.setBadgeText({text:changes.replacedPlaceholder.newValue.toString()});
    chrome.action.setBadgeBackgroundColor({color:'gray'});
});

console.log('[BACKGROUND] Script loaded successfully');
