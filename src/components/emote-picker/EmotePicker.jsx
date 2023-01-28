import React from 'react';
import { EMOTES } from '../../const/emotes';
import Emote from './emote/Emote';
import './emotePicker.scss';

/**
 * @param {string[] | undefined} arrayOfStrings
 * @param {string} lowerSearch
 * @returns {boolean}
 */
const searchInArray = (arrayOfStrings, lowerSearch) => {
  if (!arrayOfStrings) {
    return false;
  }

  return arrayOfStrings.map((element) => element.toLowerCase()).some((element) => element.includes(lowerSearch));
};

/**
 * @param {string | undefined} searchString
 * @returns {({keywords: [string], url: string, tags: string[]}|{keywords: [string], url: string, tags: [string]}|{keywords: [string], url: string, tags: [string]}|{keywords: [string], url: string, tags: [string]}|{keywords: [string], url: string, tags: [string]})[]}
 */
const searchEmotes = (searchString) => {
  const lowerSearch = searchString?.toLowerCase();

  return EMOTES.filter((emote) => {
    if (!lowerSearch) {
      return true;
    }

    return searchInArray(emote.tags, lowerSearch) || searchInArray(emote.keywords, lowerSearch);
  });
};

const EmotePicker = ({ searchString, onClick }) => {
  const filteredList = searchEmotes(searchString);

  return (
    <div className="emote-picker">
      {filteredList.map((emote, index) => (
        <Emote key={`${emote.tags[0]}_${index}`} onClick={onClick} emote={emote} />
      ))}
    </div>
  );
};

export default EmotePicker;
