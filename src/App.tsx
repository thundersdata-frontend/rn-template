import React, { useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

import { API_URL } from '@env';
import ErrorHandler from 'components/ErrorHandler';

export default function App() {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({ fade: true });
      console.log('Bootsplash has been hidden successfully');
    });
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>API_URL: {API_URL}</Text>
        <Text>hello, rn template</Text>
        <ErrorHandler>
          <ErrorDemo />
        </ErrorHandler>
      </View>
    </SafeAreaView>
  );
}

function ErrorDemo() {
  return (
    <View>
      <Text>{test}</Text>
    </View>
  );
}
