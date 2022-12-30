import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import EmotePicker from '../emote-picker/EmotePicker';

const EmotePickerOnInput = ({ inputElem }) => {
  const src = chrome.runtime.getURL('icon-34.png');

  const onClick = (tag) => {
    inputElem.value += tag;
  };

  return (
    <Popup className="input-emote-picker" trigger={<img src={src} alt="better emotes" />} position="top right">
      <EmotePicker onClick={onClick} />
    </Popup>
  );
};

export default EmotePickerOnInput;
