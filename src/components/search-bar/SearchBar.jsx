import React, { useEffect, useState } from 'react';
import './searchBar.scss';

const SearchBar = ({ onSetSearchString }) => {
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    onSetSearchString(searchString);
  }, [searchString]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Suche"
        autoFocus
        value={searchString}
        autoComplete="off"
        onChange={(evt) => setSearchString(evt.target.value)}
      />
    </div>
  );
};

export default SearchBar;
