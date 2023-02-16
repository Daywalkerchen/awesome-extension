import React, { useState } from 'react';

import EmotePicker from '../emote-picker/EmotePicker';
import SearchBar from '../search-bar/SearchBar';
import Popup from './popup/Popup';
import ErrorBoundary from '../error-boundary/ErrorBoundary';

const EmotePickerOnInput = ({ inputElem }) => {
  const [searchString, setSearchString] = useState('');

  const onClick = (tag) => {
    inputElem.value += tag;
  };
  const onSetSearchString = (searchString) => {
    setSearchString(searchString);
  };

  return (
    <ErrorBoundary>
      <Popup>
        <div>
          <SearchBar onSetSearchString={onSetSearchString} />
          <EmotePicker searchString={searchString} onClick={onClick} />
        </div>
      </Popup>
    </ErrorBoundary>
  );
};

export default EmotePickerOnInput;
