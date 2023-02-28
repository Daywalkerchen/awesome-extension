import React, { useState } from 'react';
import CheckBox from '../../../components/checkbox/CheckBox';
import { useSyncStorage, useLocalStorage } from '../../../hooks/storage';
import './settings.scss';

const Settings = () => {
  const [enableAlternates, setEnableAlternates] = useSyncStorage('enableAlternates', false);
  const [enableLinkNewtab, setEnableLinkNewtab] = useSyncStorage('enableLinkNewtab', false);
  const [replacedPlaceholder, setReplacedPlaceholder] = useSyncStorage('replacedPlaceholder', 0);
  const [_, setLinkGroups] = useLocalStorage('linkGroups', []);
  const [uploadState, setUploadState] = useState('');

  // Sets the global replacement counter to 0
  const resetCounter = () => {
    setReplacedPlaceholder(0);
  };

  const handleChange = () => {
    setEnableAlternates(!enableAlternates);
  };

  const uploadLinkConfig = () => {
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = (e) => {
      // if you select multiple files we will only use the first one
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = (readerEvent) => {
        var content = readerEvent.target.result;
        try {
          const parsed = JSON.parse(content);
          setUploadState('Config file update success');
          setLinkGroups(parsed);
        } catch (error) {
          console.error(error);
          setUploadState('Config file update failed');
        }
      };
    };
    input.click();
  };

  return (
    <div className="settings">
      <CheckBox
        id="enable-alternatives"
        label="Enable alternate replacement tags"
        value={!!enableAlternates}
        onChange={(newValue) => setEnableAlternates(newValue)}
      />
      <CheckBox
        id="enable-link-newtab"
        label="Show link collection on newtab"
        value={!!enableLinkNewtab}
        onChange={(newValue) => setEnableLinkNewtab(newValue)}
      />
      <div className="actions">
        <button className="button" onClick={resetCounter}>
          Reset Count ({replacedPlaceholder})
        </button>
        <button className="button" onClick={uploadLinkConfig}>
          Upload link config
          {uploadState ? <span className="upload-state">({uploadState})</span> : <></>}
        </button>
      </div>
    </div>
  );
};

export default Settings;
