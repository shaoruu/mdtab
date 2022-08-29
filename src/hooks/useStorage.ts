import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// Create a useState that saves to localStorage
export const useStorage = <T>(key: string, initialValue: T) => {
  // Parse localStorage value
  // const storedValue = localStorage.getItem(key);
  // const initialState = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState<T>(initialValue);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      return;
    }

    if (chrome && chrome.storage) {
      chrome.storage.sync.set({ [key]: value });
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  useEffect(() => {
    const fetch = async () => {
      await (async () => {
        if (chrome && chrome.storage) {
          const storedValue = (await chrome.storage.sync.get(key))[key] || '';
          if (!storedValue) return;
          setValue(storedValue);
        } else {
          const storedValue = localStorage.getItem(key);
          if (!storedValue) return;
          setValue(storedValue ? JSON.parse(storedValue) : initialValue);
        }
      })();

      setInitialized(true);
    };

    fetch();
  }, []);

  return [value, setValue] as [T, Dispatch<SetStateAction<T>>];
};
