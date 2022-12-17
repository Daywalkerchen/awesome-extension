import React, { useEffect, useState } from 'react';
import './Popup.scss';

const Popup = () => {
  const [enableAlternates, setEnableAlternates] = useState(null);

  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  useEffect(() => {
    chrome.storage.sync.get({ enableAlternates }, (items) => {
      setEnableAlternates(items.enableAlternates);
      console.log(items.enableAlternates);
    });
  }, []);

  // Saves options to chrome.storage
  const saveOptions = () => {
    chrome.storage.sync.set({ enableAlternates: enableAlternates }, () => {
      console.log('enableAlternates set to ' + enableAlternates);
    });
  };

  const handleChange = (e) => {
    setEnableAlternates(e.target.checked);
  };

  return (
    <div className="App">
      <h2>awesome-extension</h2>
      <div className="settings-wrapper">
        <input
          className="checkbox"
          type="checkbox"
          checked={!!enableAlternates}
          onChange={handleChange}
        />
        <label>Enable alternate replacement tags</label>
      </div>
      <div id="status"></div>
      <button className="button" onClick={saveOptions}>
        Save
      </button>
    </div>
  );
};

export default Popup;
