import { replaceEmotes } from "./modules/emotes/replaceEmotes";
// import { initializeStorage } from "./modules/storage/storage";

console.log("[CONTENT] Script loaded successfully");

window.onload = () => {
    // initializeStorage();

    setTimeout(() => {
        replaceEmotes();
    }, 2000);
};