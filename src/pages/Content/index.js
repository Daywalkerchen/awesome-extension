import { replaceEmotes } from "./modules/emotes/replaceEmotes";

console.log("[CONTENT] Script loaded successfully");

window.onload = () => {
    setTimeout(() => {
        console.log("[CONTENT] Timeout");
        replaceEmotes();
    }, 2000);

    let mutationObserverTimeout;

    const awaitingWrapperFunction = () => {
        clearTimeout(mutationObserverTimeout);

        mutationObserverTimeout = setTimeout(() => {
            replaceEmotes();
        }, 5000);
    };

    const DOM = document.body;

    const mutationObserver = new MutationObserver(awaitingWrapperFunction);

    mutationObserver.observe(DOM, { childList: true, subtree: true });
};
