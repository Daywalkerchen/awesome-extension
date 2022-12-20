// region Imports
import { replacePlaceholder } from './modules/emotes/emoteInserter';
// endregion

const isExtensionReloadError = (error) => error.message.includes('Extension context invalidated');

const logError = (error) => {
  if (isExtensionReloadError(error)) {
    console.info(`An Extension reload error: ${error.message}`);
  } else {
    console.error('Content script error', error);
  }
};

const onload = async () => {
  console.log('[CONTENT] Initial replacement');
  await replacePlaceholder();

  // Throttle replacement if changes occur too fast.
  let lastUpdate = new Date();
  let throttledTimeout;
  const throttledUpdate = (func) => {
    console.log('[CONTENT] MutationObserver detected change');

    const nextCall = 2000 - (Date.now() - lastUpdate);
    clearTimeout(throttledTimeout);

    if (nextCall <= 0) {
      func.apply();
      lastUpdate = Date.now();
    } else {
      throttledTimeout = setTimeout(() => {
        func.apply();
        lastUpdate = Date.now();
      }, nextCall);
    }
  };

  const mutationObserver = new MutationObserver(() =>
    throttledUpdate(() =>
      replacePlaceholder().catch((error) => {
        logError(error);
        mutationObserver.disconnect();
      })
    )
  );

  mutationObserver.observe(document.body, { childList: true, subtree: true });
};

window.onload = () => {
  onload().catch((error) => logError(error));
};

console.log('[CONTENT] Script loaded successfully');
