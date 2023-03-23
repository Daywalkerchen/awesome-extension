import React, { useState } from 'react';

import EmotePicker from '../emote-picker/EmotePicker';
import SearchBar from '../search-bar/SearchBar';
import Popup from './popup/Popup';
import ErrorBoundary from '../error-boundary/ErrorBoundary';
import { useSyncStorage } from '../../hooks/storage';

const EmotePickerOnInput = ({ inputElem }) => {
  const [searchString, setSearchString] = useState('');
  const [recentlyUsedEmotes, setRecentlyUsedEmotes] = useSyncStorage('recentlyUsedEmotes', {});

  const onClick = (emote) => {
    const mainTag = emote.tags[0];

    const x = recentlyUsedEmotes;

    x[mainTag] = (x[mainTag] || 0) + 1;

    setRecentlyUsedEmotes(x);

    inputElem.value += mainTag;
  };
  const onSetSearchString = (searchString) => {
    setSearchString(searchString);
  };

  const listOfEmotes =
    recentlyUsedEmotes &&
    Object.keys(recentlyUsedEmotes)
      .sort((a, b) => recentlyUsedEmotes[b] - recentlyUsedEmotes[a])
      .slice(0, 10);

  return (
    <ErrorBoundary>
      <Popup>
        <div>
          <SearchBar onSetSearchString={onSetSearchString} />
          {listOfEmotes && <EmotePicker searchString={searchString} onClick={onClick} replaceList={listOfEmotes} />}
          <EmotePicker searchString={searchString} onClick={onClick} />
        </div>
      </Popup>
    </ErrorBoundary>
  );
};

export default EmotePickerOnInput;
