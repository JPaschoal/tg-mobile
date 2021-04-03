import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const StudentHeader = ({ title, openDrawer }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { openDrawer() }} style={styles.backButton}>
        <Feather name='menu' size={24} color='#012480'/>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
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