import React, { useState } from 'react';

import EmotePicker from '../emote-picker/EmotePicker';
import SearchBar from '../search-bar/SearchBar';
import Popup from './popup/Popup';

const EmotePickerOnInput = ({ inputElem }) => {
  const [searchString, setSearchString] = useState('');

  const onClick = (tag) => {
    inputElem.value += tag;
  };
  const onSetSearchString = (searchString) => {
    setSearchString(searchString);
  };

  return (
    <Popup>
      <SearchBar onSetSearchString={onSetSearchString} />
      <EmotePicker searchString={searchString} onClick={onClick} />
    </Popup>
  );
};

export default EmotePickerOnInput;
