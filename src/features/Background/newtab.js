// Note: We have to do this in code since the newtab feature is conditionally.
// Otherwise the extension would always overwrite the newtab page.
// This way you are able to toggle it on or off.

// Note: we could use chrome.tabs.onCreated.addListener but then
// tab.url would not be present so we have to use onUpdated to get that url

chrome.tabs.onUpdated.addListener((tabId) => {
  chrome.tabs.get(tabId, (tab) => {
    // tab.url should be something like
    // chrome://newtab/ or edge://newtab/ depending on the browser
    const url = new URL(tab.url);
    if (url.hostname === 'newtab') {
      const keys = {
        enableLinkNewtab: false,
      };
      chrome.storage.sync.get(keys, (items) => {
        const enableLinkNewtab = items['enableLinkNewtab'];
        if (enableLinkNewtab === true) {
          chrome.tabs.update(tab.id, {
            url: chrome.runtime.getURL('newtab.html'),
          });
        }
      });
    }
  });
});
