import { useEffect, useState } from 'react';

export const useLocalStorage = (key, defaultValue) => {
  return useStorage(chrome.storage.local, key, defaultValue);
};

export const useSyncStorage = (key, defaultValue) => {
  return useStorage(chrome.storage.sync, key, defaultValue);
};

/**
 * @param {StorageArea} storage
 * @param {string} key
 * @param {any} defaultValue
 * @returns {[any, (element: any) => void]}
 */
const useStorage = (storageArea, key, defaultValue) => {
  const [value, setRawValue] = useState(null);

  useEffect(() => {
    const keys = {
      [key]: defaultValue,
    };
    storageArea.get(keys, (items) => {
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
    storageArea.onChanged.addListener(listener);
    const cleanup = () => {
      storageArea.onChanged.removeListener(listener);
    };
    return cleanup;
  }, []);

  const setValue = (newValue) => {
    storageArea.set({ [key]: newValue }, () => {
      console.info('Set', key, 'to', newValue);
      // state will be changed by the event listener
      // this way we do not call setRawValue twice
    });
  };

  return [value, setValue];
};
