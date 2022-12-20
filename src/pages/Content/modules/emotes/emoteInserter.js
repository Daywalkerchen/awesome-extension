// region Imports
import './emote.scss';
import { EMOTES } from '../../../../const/emotes';
// endregion

// region Constants
export const componentName = 'EmoteInserter';

const allParagraphs = document.getElementsByTagName('p');
const allLinks = document.getElementsByTagName('a');
const allSpan = document.getElementsByTagName('span');
// angular data list row items
const allDataListRowItems = document.getElementsByClassName('data-list-row-item-content');
// endregion

// region Helper functions
const isTextNode = (node) => node.nodeType === Node.TEXT_NODE;
const nodeContainsAnyTag = (node) => EMOTES.find((emote) => emote.tags.some((tag) => node.textContent.includes(tag)));
const sum = (a, b) => a + b;
// endregion

export const replacePlaceholder = async () => {
  const items = await chrome.storage.sync.get({ enableAlternates: false });
  console.info(`[${componentName}] replacing placeholder`, items.enableAlternates);
  const candidates = replacementElementCandidates();
  replaceEmotesInElements(candidates, items.enableAlternates);
};

const replacementElementCandidates = () => {
  return [
    ...allDataListRowItems,
    ...[...allParagraphs, ...allLinks, ...allSpan].filter((element) =>
      [...element.childNodes].some((node) => isTextNode(node) && nodeContainsAnyTag(node))
    ),
  ];
};

const getEmotesThatAreUsedInElement = (element, useAlternatives) => {
  return EMOTES.flatMap((emote) => {
    const emoteTags = useAlternatives ? emote.tags : emote.tags.slice(0, 1);
    const foundTags = emoteTags.filter((tag) => element.innerText.includes(tag));
    return foundTags.map((tag) => ({ tag: tag, url: emote.url }));
  });
};

const replaceEmotesInElements = (candidates, useAlternatives) => {
  if (!candidates.length) {
    return 0;
  }

  const replaceableElements = candidates
    .map((element) => ({
      element,
      emotes: getEmotesThatAreUsedInElement(element, useAlternatives),
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
      console.log(`[${componentName}] added ${addedEmotes} emotes`);
    })
  );

  return addedEmotes;
};
