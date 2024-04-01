// App.js

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import QuranSearch from './QuranSearch';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <QuranSearch />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
