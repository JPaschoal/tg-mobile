import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

// import { Container } from './styles';

const Notebooks = () => {
  return (
    <View style={styles.container}>
      <Text>
        Notebooks
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Notebooks;