import React from 'react';
import './emote.scss';

const Emote = ({ emote }) => {
  const onClick = () => {
    navigator.clipboard.writeText(emote.tag);
  }

  return (
    <div onClick={onClick} className="emote">
      {emote.tag}
    </div>
  );
};

export default Emote;