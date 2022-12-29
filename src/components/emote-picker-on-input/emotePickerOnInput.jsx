import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './emotePickerOnInput.scss';

import EmotePicker from '../emote-picker/EmotePicker';

const EmotePickerOnInput = ({ inputElem }) => {
  // todo make __perfect__ 28px icon
  const src = chrome.runtime.getURL('icon-34.png');

  const onClick = (tag) => {
    inputElem.value += tag;
  };

  return (
    <Popup className="input-emote-picker" trigger={<img src={src} alt="better emotes" />} position="top right">
      <div>
        <EmotePicker onClick={onClick} />
      </div>
    </Popup>
  );
};

export default EmotePickerOnInput;
