// region Imports
import { componentName as replacerComponentName, replacePlaceholder } from './modules/emotes/emoteInserter';
import { componentName as bbbbComponentName, insertDailySchedule } from './modules/better-big-blue-button/betterBigBlueButton';
import { componentName as emopComponentName, initEmotePickerOnChatBoxes } from './modules/emote-picker-on-chat-boxes/emotePickerOnChatBoxes';
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

const logErrorAndDisconnect = (componentName, observer, error) => {
  logError(componentName, error);
  observer.disconnect();
};
// endregion

// region mutation observation

const initMutationObserver = async () => {
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

  const observer = new MutationObserver(() =>
    throttledUpdate(() => {
      replacePlaceholder().catch((e) => logErrorAndDisconnect(replacerComponentName, observer, e));

      initEmotePicker().catch((e) => logErrorAndDisconnect(emopComponentName, observer, e));
    })
  );

  observer.observe(document.body, { childList: true, subtree: true });
};

// endregion

//region emote replacement

const initGlobalEmotes = async () => {
  console.log('[CONTENT] Initial replacement');
  await replacePlaceholder();
};

// endregion

// region better big blue button

const initBetterBigBlueButton = async () => {
  if (document.URL.startsWith('https://conference.')) {
    chrome.runtime.onMessage.addListener((request) => {
      if (request === BBBB_INSERT_DAILY_SCHEDULE_MESSAGE) {
        insertDailySchedule();
      }
    });
  }
};

// endregion

// region emote picker on chat boxes

const initEmotePicker = async () => {
  initEmotePickerOnChatBoxes();
};

// endregion

window.onload = () => {
  initGlobalEmotes().catch((error) => logError(replacerComponentName, error));
  initBetterBigBlueButton().catch((error) => logError(bbbbComponentName, error));
  initEmotePicker().catch((error) => logError(emopComponentName, error));

  initMutationObserver();
};

console.log('[CONTENT] Script loaded successfully');
