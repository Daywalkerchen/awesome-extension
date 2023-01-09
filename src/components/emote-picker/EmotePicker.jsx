import React from 'react';
import { EMOTES } from '../../const/emotes';
import Emote from './emote/Emote';
import './emotePicker.scss';

const EmotePicker = ({ searchString, onClick }) => {
  const filteredList = EMOTES.filter((emote) => !searchString || emote.tags[0].toLowerCase().includes(searchString?.toLowerCase()));

  return (
    <div className="emote-picker">
      {filteredList.map((emote, index) => (
        <Emote key={`${emote.tags[0]}_${index}`} onClick={onClick} emote={emote} />
      ))}
    </div>
  );
};

export default EmotePicker;
