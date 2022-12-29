// region Imports
import React from 'react';
import './emote.scss';
// endregion

const Emote = ({ emote, onClick }) => {
  const tag = emote.tags[0];

  return (
    <div onClick={() => onClick(tag)} className="emote">
      <img src={emote.url} title={tag} alt={tag} />
    </div>
  );
};

export default Emote;
