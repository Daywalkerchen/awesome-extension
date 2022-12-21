import React from 'react';
import './emote.scss';

const Emote = ({ emote }) => {
  const tag = emote.tags[0];
  const onClick = () => {
    navigator.clipboard.writeText(tag);
  };

  return (
    <div onClick={onClick} className="emote">
      <img height="15px" width="15px" src={emote.url} title={tag}/>
    </div>
  );
};

export default Emote;
