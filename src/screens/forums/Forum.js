import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Background from '../../components/background/Background';
import StackHeader from '../../components/stackHeader/StackHeader';

import ads from './utils/adsSubjects'

const forum = ({ navigation }) => {

  return (
    <Background>
      <StackHeader title='ADS' previous="Forums" goBackTo={navigation.navigate} />
      {
        ads.map((semester, index) => {
          return(
            <TouchableOpacity 
              key={index} 
              onPress={()=> {}} 
              style={styles.semesterBtn}
            >
              <Text style={styles.semesterTxt}>{`${index+1}° Semestre`}</Text>
            </TouchableOpacity>
          )
        }) 
      }
    </Background>
  );
}

const styles = StyleSheet.create({
  semesterBtn: {
    marginBottom: 10,
    paddingVertical: 15,
    borderColor: 'rgba(35, 49, 170, 0.1)',
    borderWidth: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  semesterTxt: {
    fontSize: 18
  }
});

export default forum;