import React, { useState } from 'react';

import EmotePicker from '../emote-picker/EmotePicker';
import SearchBar from '../search-bar/SearchBar';

const EmotePickerOnInput = ({ inputElem }) => {
  const [searchString, setSearchString] = useState('');

  const src = chrome.runtime.getURL('icon-28.png');

  const onClick = (tag) => {
    inputElem.value += tag;
  };
  const onSetSearchString = (searchString) => {
    setSearchString(searchString);
  };

  return (
    <div
      contentStyle={{ minHeight: '230px' }}
      draggable="false"
      className="input-emote-picker"
      trigger={<img src={src} alt="better emotes" />}
      position="top left">
      <SearchBar onSetSearchString={onSetSearchString} />
      <EmotePicker searchString={searchString} onClick={onClick} />
    </div>
  );
};

export default EmotePickerOnInput;
