const COLORS = ['slategray', 'gray', 'silver', '#0070dd', '#a335ee', '#ff8000', '#e6cc80'];
const FORMATTER = Intl.NumberFormat('en', { notation: 'compact' });

chrome.storage.onChanged.addListener((changes) => {
  const replaceCounter = changes.replacedPlaceholder?.newValue || 0;
  const color = COLORS[Math.min(Math.trunc(replaceCounter).toString().length, COLORS.length) - 1];
  const text = FORMATTER.format(replaceCounter);
  chrome.action.setBadgeBackgroundColor({ color });
  chrome.action.setBadgeText({ text });
});
