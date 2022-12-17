// region Imports
import './emote.scss';
import { EMOTES, EMOTES_ALTERNATES } from '../../../../const/emotes';
// endregion

export const replaceEmotes = () => {
  replaceDefaultEmoteSet();

  chrome.storage.sync.get(
    { enableAlternates: false },
    (items) => items.enableAlternates && replaceAlternateEmoteSet()
  );
};

const replaceDefaultEmoteSet = () => {
  console.log('[REPLACE_DEFAULT_EMOTE] Entered function');
  const array = defaultReplacementElementCandidates();

  if (array.length > 0) {
    replaceEmotesInElements(array, EMOTES);
  }
  console.log('[REPLACE_DEFAULT_EMOTE] Done function');
};

const replaceAlternateEmoteSet = () => {
  console.log('[REPLACE_ALTERNATES] Entered function');
  const array = [
    ...defaultReplacementElementCandidates(),
    ...document.querySelectorAll('div.data-list-row-item-content'),
  ];

  if (array.length > 0) {
    replaceEmotesInElements(array, EMOTES_ALTERNATES);
  }
  console.log('[REPLACE_ALTERNATES] Done function');
};

const isTextNode = (node) => node.nodeType === Node.TEXT_NODE;

const nodeContainsAnyTag = (node) => EMOTES.find((x) => node.textContent.includes(x.tag));

const defaultReplacementElementCandidates = () => {
  const allElements = document.querySelectorAll('span, a, p');

  return [...allElements].filter((element) =>
    [element, ...element.childNodes].some((node) => isTextNode(node) && nodeContainsAnyTag(node))
  );
};

const replaceEmotesInElements = (array, emoteSet) => {
  const replaceableElements = array
    .map((element) => ({
      element,
      emotes: emoteSet.filter((emote) => element.innerText.includes(emote.tag)),
    }))
    .filter((pair) => pair.emotes.length > 0);

  if (!replaceableElements.length) {
    return;
  }

  replaceableElements.forEach(({ element, emotes }) => {
    console.log('[REPLACE_EMOTE] Successfully found emotes', emotes);

    emotes.forEach((emote) => {
      element.innerHTML = element.innerHTML.replaceAll(
        emote.tag,
        `<span class="replaced-emote" style="background-image: url(${emote.url})" title="${emote.tag}">replaced_emote</span>`
      );
    });
  });
};
