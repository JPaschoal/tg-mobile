import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

// import { Container } from './styles';

const Logout = () => {
  return (
    <View style={styles.container}>
      <Text >
        Logout
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

export default Logout;