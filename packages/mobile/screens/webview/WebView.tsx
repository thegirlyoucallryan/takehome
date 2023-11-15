


import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView as NativeWebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WebViewComponent = () => {
  const webViewRef = useRef<NativeWebView | null>(null);
  const [url, setUrl] = useState('')

  useEffect(() => {
    const loadWebView = async () => {
      try {
        const token = await AsyncStorage.getItem('TAKE_HOME_TOKEN');

        if (token) {
       
          const urlWithToken = `${process.env.EXPO_PUBLIC_WEBAPP_ROOT}?token=${encodeURIComponent(token)}`;
        
          setUrl(urlWithToken)
       
          webViewRef.current?.reload(); 
          webViewRef.current?.injectJavaScript(`window.location.href = '${urlWithToken}';`);
        }
      } catch (e) {
        console.error('Error retrieving token:', e);
      }
    };

    // Call the asynchronous function
    loadWebView();
  }, []);



  return (
    <View style={styles.container}>
     {url && <NativeWebView
        ref={(ref) => (webViewRef.current = ref)}
        source={{uri:url}}
        
      />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebViewComponent;