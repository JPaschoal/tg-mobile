import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Forums = () => {
  return (
    <View style={styles.container}>
      <Text>
        Forums
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


export default Forums;