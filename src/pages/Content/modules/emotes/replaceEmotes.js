// region Imports
import "./emote.scss";
import { EMOTES } from "../../../../const/emotes";
// endregion

export const replaceEmotes = () => {
    console.log("[REPLACE_EMOTE] Entered function");

    const allParagraphs = document.getElementsByTagName("p");
    const allLinks = document.getElementsByTagName("a");

    if (!allParagraphs.length && !allLinks.length) {
        return;
    }

    const array = [...allParagraphs, ...allLinks];

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
              `<span 
                        class="replaced-emote" 
                        style="background-image: url(${emote.url})"
                    >
                    replaced_emote
                    </span>`
            );
        });
    });
};