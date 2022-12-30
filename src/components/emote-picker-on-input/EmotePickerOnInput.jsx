import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import EmotePicker from '../emote-picker/EmotePicker';
import SearchBar from '../search-bar/SearchBar';

const EmotePickerOnInput = ({ inputElem }) => {
  const [searchString, setSearchString] = useState('');

  const src = chrome.runtime.getURL('icon-34.png');

  const onClick = (tag) => {
    inputElem.value += tag;
  };
  const onSetSearchString = (searchString) => {
    setSearchString(searchString);
  };

  return (
    <Popup contentStyle={{ minHeight: '230px' }} className="input-emote-picker" trigger={<img src={src} alt="better emotes" />} position="top left">
      <SearchBar onSetSearchString={onSetSearchString} />
      <EmotePicker searchString={searchString} onClick={onClick} />
    </Popup>
  );
};

export default EmotePickerOnInput;
