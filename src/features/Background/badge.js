// region Imports
import { COLORS } from '../../const/colors';
// endregion

const FORMATTER = Intl.NumberFormat('en', { notation: 'compact' });

chrome.storage.onChanged.addListener(async (changes) => {
  const replaceCounter = changes.replacedPlaceholder?.newValue || 0;

  const color = COLORS[Math.min(Math.trunc(replaceCounter).toString().length, COLORS.length) - 1];
  const text = FORMATTER.format(replaceCounter);

  await chrome.action.setBadgeBackgroundColor({ color });
  await chrome.action.setBadgeText({ text });
});
