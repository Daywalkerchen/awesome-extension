import React from 'react';
import { EMOTES } from '../../const/emotes';
import Emote from './emote/Emote';
import './emotePicker.scss';

const EmotePicker = ({ onClick }) => {
  return (
    <div className="emote-picker">
      {EMOTES.map((emote, index) => (
        <Emote key={`${emote.tags[0]}_${index}`} onClick={onClick} emote={emote} />
      ))}
    </div>
  );
};

export default EmotePicker;