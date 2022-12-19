import React from 'react';
import './emote.scss';

const Emote = ({ emote }) => {
  const tag = emote.tags[0];
  const onClick = () => {
    navigator.clipboard.writeText(tag);
  }

  return (
    <div onClick={onClick} className="emote">
      {tag}
    </div>
  );
};

export default Emote;