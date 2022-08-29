import { useState } from "react";

export const getStorageValue = (key, defaultValue) => {
  const saved = localStorage.getItem(encrypt(key));
  const initial = !!saved ? JSON.parse(descencrypt(saved)) : saved;
  return initial || defaultValue;
};

export const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(encrypt(keyName));
      if (value) {
        return encrypt(JSON.parse(value));
      } else {
        window.localStorage.setItem(
          encrypt(keyName),
          encrypt(JSON.stringify(defaultValue))
        );
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(
        encrypt(keyName),
        encrypt(JSON.stringify(newValue))
      );
    } catch (err) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export const encrypt = (value) => {
  return btoa(value);
};

export const descencrypt = (value) => {
  return atob(value);
};
