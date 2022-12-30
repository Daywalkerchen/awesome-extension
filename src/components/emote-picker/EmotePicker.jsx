import React from 'react';
import { EMOTES } from '../../const/emotes';
import Emote from './emote/Emote';
import './emotePicker.scss';

const EmotePicker = ({ searchString, onClick }) => {
  console.log(searchString);

  if (searchString) {
    return (
      <div className="emote-picker">
        {EMOTES.filter((emote) => emote.tags[0].toLowerCase().includes(searchString?.toLowerCase())).map((emote, index) => (
          <Emote key={`${emote.tags[0]}_${index}`} onClick={onClick} emote={emote} />
        ))}
      </div>
    );
  }

  return (
    <div className="emote-picker">
      {EMOTES.map((emote, index) => (
        <Emote key={`${emote.tags[0]}_${index}`} onClick={onClick} emote={emote} />
      ))}
    </div>
  );
};

export default EmotePicker;
