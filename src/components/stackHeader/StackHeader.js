import React, { useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react/cjs/react.development';

const StackHeader = ({title, previous, goBackTo}) => {
  const [headerWidth, setHeaderWidth] = useState()

  useEffect(() => {
    previous ? setHeaderWidth('80%') : setHeaderWidth('100%')
  }, [])

  return (
    <View style={styles.container}>
      {previous && (
        <TouchableOpacity onPress={() => { goBackTo(previous) }} style={styles.backButton}>
          <Feather name='arrow-left' size={30} color='#012480'/>
        </TouchableOpacity>
      )}
      <Text style={{
        width: headerWidth,
        textAlign: 'center',
        fontSize: 40
      }}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    paddingBottom: 15,
    borderBottomWidth: 8,
    borderBottomColor: 'rgba(35, 49, 170, 0.1)',
    marginBottom: 25
  },
  backButton: {
  }
})

export default StackHeader;