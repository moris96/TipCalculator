import React from 'react';
import { StyleSheet, View } from 'react-native';
import Tips from './src/components/Tips';

import Background from './src/background/Background';

import Ads from './src/components/Ads';


export default function App() {

  return (
    <View style={styles.container}>
      <Ads/>
      <Background/>
      <Tips/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  // text: {
  //   fontSize: 50,
  //   marginBottom: 30,
  //   color: 'black',
  // },
});
