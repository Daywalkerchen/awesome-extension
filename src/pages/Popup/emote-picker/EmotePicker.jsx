import React from 'react';
import { EMOTES } from '../../../const/emotes';
import Emote from './emote/Emote';
import './emotePicker.scss';

const EmotePicker = () => {

  return (
    <div className="emote-picker">
      {EMOTES.map((emote, index) => (
        <Emote key={`${emote.tag}_${index}`} emote={emote} />
      ))}
    </div>
  );
};

export default EmotePicker;