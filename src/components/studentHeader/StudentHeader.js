import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const StudentHeader = ({ title, openDrawer }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { openDrawer() }} style={styles.backButton}>
        <Text>
          menu
        </Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    padding: 15,
    paddingTop: 50,
    paddingBottom: 30,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  backButton: {
  },

  title: {
    width: '80%',
    textAlign: 'center',
    fontSize: 40
  }
})

export default StudentHeader;