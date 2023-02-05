import { useEffect, useState } from 'react';

export const useSyncStorage = (key, defaultValue) => {
  const [value, setRawValue] = useState(null);

  useEffect(() => {
    const keys = {
      [key]: defaultValue,
    };
    chrome.storage.sync.get(keys, (items) => {
      setRawValue(items[key]);
    });

    const listener = (changes) => {
      const change = changes[key];
      if (!change) {
        return;
      }

      const newValue = change.newValue ?? defaultValue;
      setRawValue(newValue);
    };
    chrome.storage.onChanged.addListener(listener);
    const cleanup = () => {
      chrome.storage.onChanged.removeListener(listener);
    };
    return cleanup;
  }, []);

  const setValue = (newValue) => {
    chrome.storage.sync.set({ [key]: newValue }, () => {
      console.log('Set', key, 'to', newValue);
      // state will be changed by the event listener
      // this way we do not call setRawValue twice
    });
  };

  return [value, setValue];
};
