import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Circle } from 'react-native-animated-spinkit';

import Background from '../../../components/background/Background';
import StudentHeader from '../../../components/studentHeader/StudentHeader';
import api from '../../../services/api';

const Absenses = ({ navigation }) => {
  const [disciplines, setDisciplines] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('enrolledDisciplines')
    .then((response) => {
      setDisciplines(response.data)
      setLoading(false)
    })
  }, [])


  return (
    <Background>
      <StudentHeader title='Faltas' openDrawer={navigation.openDrawer} />
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitles}>Disciplina</Text>
          <Text style={styles.headerTitles}>Faltas</Text>
        </View>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Circle
              size={80}
              color='#012480'
              style={styles.loading}
            />
          </View>
        ) : (
          <View style={styles.absensesContainer}>
            {disciplines.map((discipline, index) => {
              return(
                <View key={index} style={styles.absenseItemContainer}>
                  <Text style={styles.itemText}>{discipline.name}</Text>
                  <Text style={styles.itemText}>{discipline.absenses}</Text>
                </View>
              )
            })}
          </View>
        )}
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 8,
    borderBottomColor: 'rgba(35, 49, 170, 0.1)',
    paddingBottom: 10
  },
  headerTitles: {
    fontSize: 26
  },
  loadingContainer: { 
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100
  },
  absensesContainer: {
    marginTop: 40
  },
  absenseItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(35, 49, 170, 0.1)',
    paddingBottom: 10
  },
  itemText: {
    fontSize: 16,
    maxWidth: '60%'
  }
})

export default Absenses;