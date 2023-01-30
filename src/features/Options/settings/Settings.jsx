import React from 'react';
import { useSyncStorage } from '../../../hooks/storage';
import './settings.scss';

const Settings = () => {
  const [enableAlternates, setEnableAlternates] = useSyncStorage('enableAlternates', false);
  const [replacedPlaceholder, setReplacedPlaceholder] = useSyncStorage('replacedPlaceholder', 0);

  // Sets the global replacement counter to 0
  const resetCounter = () => {
    setReplacedPlaceholder(0);
  };

  const handleChange = () => {
    setEnableAlternates(!enableAlternates);
  };

  return (
    <div className="settings">
      <input id="enable-alternatives" className="checkbox" type="checkbox" checked={!!enableAlternates} onChange={handleChange} />
      <label htmlFor="enable-alternatives">Enable alternate replacement tags</label>
      <div className="actions">
        <button className="button" onClick={resetCounter}>
          Reset Count ({replacedPlaceholder})
        </button>
      </div>
    </div>
  );
};

export default Settings;
