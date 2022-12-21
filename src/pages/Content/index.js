// region Imports
import { componentName as replacerComponentName, replacePlaceholder } from './modules/emotes/emoteInserter';
import { componentName as bbbbComponentName, insertDailySchedule } from './modules/better-big-blue-button/betterBigBlueButton';
import { BBBB_INSERT_DAILY_SCHEDULE_MESSAGE } from '../../const/messages';
// endregion

// region helper

const isExtensionReloadError = (error) => error.message.includes('Extension context invalidated');

const logError = (component, error) => {
  if (isExtensionReloadError(error)) {
    console.info(`An Extension reload error: ${error.message}`);
  } else {
    console.error(`[${component}] Content script error`, error);
  }
};

// endregion

//region emote replacement

const initGlobalEmotes = async () => {
  console.log('[CONTENT] Initial replacement');
  await replacePlaceholder();

  // Throttle replacement if changes occur too fast.
  let lastUpdate = new Date();
  let throttledTimeout;
  const throttledUpdate = (func) => {
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
        logError(replacerComponentName, error);
        mutationObserver.disconnect();
      })
    )
  );

  mutationObserver.observe(document.body, { childList: true, subtree: true });
};

// endregion

// region better big blue button

const initBetterBigBlueButton = async () => {
  chrome.runtime.onMessage.addListener((request) => {
    if (request === BBBB_INSERT_DAILY_SCHEDULE_MESSAGE) {
      insertDailySchedule();
    }
  });
};

// endregion

window.onload = () => {
  initGlobalEmotes().catch((error) => logError(replacerComponentName, error));

  // todo exact urls to enable BBBB to settings
  if (document.URL.startsWith('https://conference.')) {
    initBetterBigBlueButton().catch((error) => logError(bbbbComponentName, error));
  }
};
console.log('[CONTENT] Script loaded successfully');
