import { replaceEmotes } from "./modules/emotes/replaceEmotes";
// import { initializeStorage } from "./modules/storage/storage";

console.log("[CONTENT] Script loaded successfully");

window.onload = () => {
    // initializeStorage();

    setTimeout(() => {
        replaceEmotes();
    }, 2000);
};

// window.addEventListener("DOMNodeInserted", () => {
//     setTimeout(() => {
//         replaceEmotes();
//     }, 1000);
// });

const node = document.body;

const config = { childList: true, characterData: true, subtree: true, attributes: true };

let observer = new MutationObserver(replaceEmotes);

observer.observe(node, config);