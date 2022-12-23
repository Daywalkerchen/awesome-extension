import React, { useEffect, useState } from 'react';
import './settings.scss';

const Settings = () => {
  const [enableAlternates, setEnableAlternates] = useState(null);

  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  useEffect(() => {
    chrome.storage.sync.get({ enableAlternates }, (items) => {
      setEnableAlternates(items.enableAlternates);
      console.log(items.enableAlternates);
    });
  }, []);

  // Sets the global replacement counter to 0
  const resetCounter = () => {
    chrome.storage.sync.set({ replacedPlaceholder: 0 }, () => {
      console.log('resetted replacedPlaceholder');
    });
  };

  const handleChange = () => {
    const newValue = !enableAlternates;

    setEnableAlternates(newValue);

    chrome.storage.sync.set({ enableAlternates: newValue }, () => {
      console.log('enableAlternates set to ' + newValue);
    });
  };

  return (
    <div className="settings">
      <input id="enable-alternatives" className="checkbox" type="checkbox" checked={!!enableAlternates} onChange={handleChange} />
      <label for="enable-alternatives">Enable alternate replacement tags</label>
      <div className="actions">
        <button className="button" onClick={resetCounter}>
          Reset Count
        </button>
      </div>
    </div>
  );
};

export default Settings;
