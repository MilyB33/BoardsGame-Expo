import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
  const storeData = async (value: any) => {
    try {
      await AsyncStorage.setItem("JWT", value);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const value = (await AsyncStorage.getItem("JWT")) || null;
      console.log(value);
    } catch (e) {
      console.log(e);
    }
  };

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem("JWT");
    } catch (e) {
      console.log(e);
    }
  };

  return { storeData, getData, removeData };
};

export default useStorage;
