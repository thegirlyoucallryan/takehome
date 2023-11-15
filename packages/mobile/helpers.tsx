import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('Data stored successfully');
    } catch (e) {
      console.error('Error storing data:', e);
    }
  };