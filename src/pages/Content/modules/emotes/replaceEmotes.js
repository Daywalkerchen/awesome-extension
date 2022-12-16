// region Imports
import "./emote.scss";
import { EMOTES } from "../../../../const/emotes";
// endregion

export const replaceEmotes = () => {
    console.log("[REPLACE_EMOTE] Entered function");

    const allParagraphs = document.getElementsByTagName("p");
    const allLinks = document.getElementsByTagName("a");
    const allSpan = document.getElementsByTagName("span");

    let array = [...allParagraphs, ...allLinks, ...allSpan];

    if (!array.length) {
        return;
    }

    array = array.filter((ele) => {
        const {
            childNodes
        } = ele;

        return [...childNodes].some((node) => {
            return EMOTES.find((x) => node.textContent.includes(x.tag) && node.nodeType === Node.TEXT_NODE);
        });
    });

    const replaceableElements = array.filter(element =>
      EMOTES.find((emote) => element.innerText.includes(emote.tag))
    );

    if (!replaceableElements.length) {
        return;
    }

    replaceableElements.forEach(element => {
        console.log("[REPLACE_EMOTE] Successfully found emote");

        const foundEmotes = EMOTES.filter(emote => element.innerText.includes(emote.tag));

        foundEmotes.forEach((emote) => {
            element.innerHTML = element.innerHTML.replaceAll(
              emote.tag,
              `<span class="replaced-emote"  style="background-image: url(${emote.url})">replaced_emote</span>`
            );
        });
    });
};