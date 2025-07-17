// src/hooks/useNotification.ts

import { useState, useCallback } from 'react';
import { ToastAndroid, Platform, Alert } from 'react-native';

export function useNotification() {
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = useCallback((message: string) => {
    setNotification(message);

    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('Notice', message);
    }

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }, []);

  return { notification, showNotification };
}
