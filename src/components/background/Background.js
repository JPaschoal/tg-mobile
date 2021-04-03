import React from 'react';
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet } from 'react-native';

const Background = ({ children }) => {
  return (
    <LinearGradient
      colors={[
        'rgba(48, 101, 239, 0.97)',
        'rgba(36, 75, 174, 0.35)'
      ]}
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Background;