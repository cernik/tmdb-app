import { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";

export function useAsyncStorage(key = "storageKey", defaultValue = null) {
  const [storageItem, setStorageItem] = useState(defaultValue);

  async function getStorageItem() {
    try {
      let data = (await AsyncStorage.getItem(key)) || defaultValue;
      setStorageItem(typeof data === "string" ? JSON.parse(data) : data);
    } catch (e) {
      throw e;
    }
  }

  function updateStorageItem(data) {
    try {
      AsyncStorage.setItem(key, JSON.stringify(data));
      setStorageItem(data);
      return data;
    } catch (e) {
      throw e;
    }
  }

  function clearStorageItem() {
    try {
      AsyncStorage.removeItem(key);
      setStorageItem(defaultValue);
    } catch (e) {
      throw e;
    }
  }

  useEffect(() => {
    getStorageItem();
  }, []);

  return [storageItem, updateStorageItem, clearStorageItem];
}
