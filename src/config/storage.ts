import { AsyncStorage } from 'react-native';

//储存Storage
const setStorage = (key: string, value: string) => {
  AsyncStorage.setItem(key, value);
};

//获取Storage
async function getStorage(key: string) {
  let value;
  await AsyncStorage.getItem(key, (_, result) => {
    value = result;
  });
  return value;
}

//移除Storage
async function removeStorage(key: string) {
  return AsyncStorage.removeItem(key);
}

export default {
  setStorage,
  getStorage,
  removeStorage,
};
