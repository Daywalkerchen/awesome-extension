import React from 'react';
import './Popup.scss';
import Header from '../../components/header/Header';
import EmotePicker from '../../components/emote-picker/EmotePicker';

const Popup = () => {
  const onClick = async (tag) => {
    await navigator.clipboard.writeText(tag);
  };

  return (
    <div className="popup">
      <Header />
      <EmotePicker onClick={onClick} />
    </div>
  );
};

export default Popup;
