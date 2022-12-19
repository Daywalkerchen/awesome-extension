import React from 'react';
import './emote.scss';

const Emote = ({ emote }) => {
  console.log(emote.tag);
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