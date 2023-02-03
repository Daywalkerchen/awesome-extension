// region Imports
import { COLORS } from '../../const/colors';
// endregion

const FORMATTER = Intl.NumberFormat('en', { notation: 'compact' });

chrome.storage.onChanged.addListener(async (changes) => {
  const replaceCounter = changes.replacedPlaceholder?.newValue || 0;

  const x = COLORS.filter((x) => x.startingValue <= replaceCounter);
  const y = x[x.length - 1];

  const color = y.color;
  const text = FORMATTER.format(replaceCounter);

  await chrome.action.setBadgeBackgroundColor({ color });
  await chrome.action.setBadgeText({ text });
});
