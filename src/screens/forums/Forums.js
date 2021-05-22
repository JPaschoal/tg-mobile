import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import Background from '../../components/background/Background'
import StackHeader from '../../components/stackHeader/StackHeader'

const courses = [
  "Logística",
  "Análise e desenvolvimento de sistemas",
  "Gestão da tecnologia da informação",
  "Gestão financeira",
  "Gestão empresarial"
]

const Forums = ({ navigation }) => {

  return (
    <Background>
      <StackHeader title="Fóruns" />
      <ScrollView>
        <TouchableOpacity style={styles.forumsBtn}>
          <Text style={styles.forumsTxt}>Discussão geral</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forumsBtn}>
          <Text style={styles.forumsTxt}>Avisos institucionais</Text>
        </TouchableOpacity>
        {
          courses.map((course, index) => {
            return (
              <TouchableOpacity 
                key={index} 
                style={styles.forumsBtn} 
                onPress={() => {
                  navigation.navigate('Forum')
                }}
              >
                <Text style={styles.forumsTxt}>{course}</Text>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  forumsBtn: {
    marginBottom: 10,
    paddingVertical: 15,
    borderColor: 'rgba(35, 49, 170, 0.1)',
    borderWidth: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  forumsTxt: {
    fontSize: 18
  }
});


export default Forums;