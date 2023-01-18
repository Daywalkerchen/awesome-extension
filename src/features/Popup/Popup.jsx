import React, { useState } from 'react';
import './Popup.scss';
import Header from '../../components/header/Header';
import EmotePicker from '../../components/emote-picker/EmotePicker';
import SearchBar from '../../components/search-bar/SearchBar';

const Popup = () => {
  const [searchString, setSearchString] = useState('');
  const onClick = async (tag) => {
    await navigator.clipboard.writeText(tag);
  };

  const onSetSearchString = (searchString) => {
    setSearchString(searchString);
  };

  return (
    <div className="popup">
      <Header />
      <SearchBar onSetSearchString={onSetSearchString} />
      <EmotePicker searchString={searchString} onClick={onClick} />
    </div>
  );
};

export default Popup;
