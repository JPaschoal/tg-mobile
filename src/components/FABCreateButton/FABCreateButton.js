import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

// import { Container } from './styles';

const FABCreateButton = ({ setOperation, setOpen}) => {
  return (
    <TouchableOpacity 
      styles={styles.plusBtn}  
      onPress={() => {
          setOperation('create')
          setOpen(true)
        }
      }
    >
      <Feather name='plus' size={48} color={'#fff'} style={styles.btnIcon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  plusBtn: {
    position: 'absolute',
    alignItems: 'flex-end'
  },
  btnIcon: {
    backgroundColor: "rgba(35, 49, 170, 0.5)",
    width: 48,
    borderRadius: 100,
    alignSelf:'center',
    marginBottom: 5
  },
})

export default FABCreateButton;