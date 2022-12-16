import { replaceEmotes } from "./modules/emotes/replaceEmotes";

console.log("[CONTENT] Script loaded successfully");

window.onload = () => {
    setTimeout(() => {
        console.log("[CONTENT] Timeout");
        replaceEmotes();
    }, 2000);
};
