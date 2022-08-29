import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// Create a useState that saves to localStorage
export const useStorage = <T>(key: string, initialValue: T) => {
  // Parse localStorage value
  // const storedValue = localStorage.getItem(key);
  // const initialState = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    if (JSON.stringify(value) === JSON.stringify(initialValue)) {
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
      if (chrome && chrome.storage) {
        const storedValue = (await chrome.storage.sync.get(key))[key] || '';
        if (!storedValue) return;
        setValue(storedValue);
        return;
      }

      const storedValue = localStorage.getItem(key);
      setValue(storedValue ? JSON.parse(storedValue) : initialValue);
    };

    fetch();
  }, []);

  return [value, setValue] as [T, Dispatch<SetStateAction<T>>];
};
