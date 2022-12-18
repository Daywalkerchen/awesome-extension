// region Imports
import './emote.scss';
import { EMOTES, EMOTES_ALTERNATES } from '../../../../const/emotes';
// endregion

export class EmoteInserter {
  // getElementsByTagName and getElementsByClassName are returning live node list. So in case the DOM gets updated it will contain the new items.
  // So in order to only doing the operations once, we keep a ref. to the live list.
  allParagraphs = document.getElementsByTagName('p');
  allLinks = document.getElementsByTagName('a');
  allSpan = document.getElementsByTagName('span');
  // angular data list row items
  allDataListRowItems = document.getElementsByClassName('data-list-row-item-content');

  replacePlaceholder() {
    const candidates = this.replacementElementCandidates();
    console.info('[EmoteInserter] replacing default placeholder');
    replaceDefaultPlaceholder(candidates);

    chrome.storage.sync.get({ enableAlternates: false }, (items) => {
      if (items.enableAlternates) {
        console.info('[EmoteInserter] replacing alternate placeholder');
        replaceAlternatePlaceholder(candidates);
      }
    });
  }

  replacementElementCandidates() {
    return [
      ...this.allDataListRowItems,
      ...[...this.allParagraphs, ...this.allLinks, ...this.allSpan].filter((element) =>
        [...element.childNodes].some((node) => isTextNode(node) && nodeContainsAnyTag(node))
      ),
    ];
  }
}

const isTextNode = (node) => node.nodeType === Node.TEXT_NODE;
const nodeContainsAnyTag = (node) => EMOTES.find((x) => node.textContent.includes(x.tag));

const replaceDefaultPlaceholder = (candidates) => replaceEmotesInElements(candidates, EMOTES);
const replaceAlternatePlaceholder = (candidates) =>
  replaceEmotesInElements(candidates, EMOTES_ALTERNATES);

const replaceEmotesInElements = (candidates, emoteSet) => {
  if (!candidates.length) {
    return 0;
  }

  const replaceableElements = candidates
    .map((element) => ({
      element,
      emotes: emoteSet.filter((emote) => element.innerText.includes(emote.tag)),
    }))
    .filter((pair) => pair.emotes.length > 0);

  if (!replaceableElements.length) {
    return 0;
  }

  const addedEmotes = replaceableElements
    .map(({ element, emotes }) =>
      emotes
        .map((emote) => {
          const numOfPlaceholders = element.innerHTML.split(emote.tag).length - 1;
          element.innerHTML = element.innerHTML.replaceAll(
            emote.tag,
            `<span class="replaced-emote" style="background-image: url(${emote.url})" title="${emote.tag}">replaced_emote</span>`
          );
          return numOfPlaceholders;
        })
        .reduce(sum)
    )
    .reduce(sum);

  chrome.storage.sync.get({ replacedPlaceholder: 0 }, (item) =>
    chrome.storage.sync.set({ replacedPlaceholder: item.replacedPlaceholder + addedEmotes }, () => {
      console.log('[EmoteInserter] added %d emotes', addedEmotes);
    })
  );

  return addedEmotes;
};

const sum = (a, b) => a + b;
