// region Imports
import { EmoteInserter } from './modules/emotes/emoteInserter';
// endregion

window.onload = () => {
  const replacer = new EmoteInserter();
  console.log('[CONTENT] Initial replacement');
  replacer.replacePlaceholder();

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
    throttledUpdate(() => replacer.replacePlaceholder())
  );

  mutationObserver.observe(document.body, { childList: true, subtree: true });
};

console.log('[CONTENT] Script loaded successfully');
