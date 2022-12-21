// region Imports
import React from 'react';
import './emote.scss';
// endregion

const Emote = ({ emote }) => {
  const tag = emote.tags[0];
  const onClick = async () => {
    await navigator.clipboard.writeText(tag);
  };

  return (
    <div onClick={onClick} className="emote">
      <img src={emote.url} title={tag}  alt={tag}/>
    </div>
  );
};

export default Emote;
