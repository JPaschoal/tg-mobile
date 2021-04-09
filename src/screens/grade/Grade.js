import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Circle } from 'react-native-animated-spinkit';
import DropDownPicker from 'react-native-dropdown-picker';

import Background from '../../components/background/Background';
import StudentHeader from '../../components/studentHeader/StudentHeader';
import api from '../../services/api';

const Grade = ({ navigation }) => {
  const [grades, setGrades] = useState()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    api.get('grades')
    .then((response) => {
      setGrades(response.data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if(grades){
      const itemsList = grades.map((element, index) => {
        return {label: element.discipline.name, value: index}
      })
      setItems(itemsList)
    }
  }, [grades])

  return (
    <Background>
      <View style={styles.container}>
        <StudentHeader title="Notas" openDrawer={navigation.openDrawer} />
        {loading ? (
          <View style={styles.loadingContainer}>
            <Circle
              size={80}
              color='#012480'
              style={styles.loading}
            />
          </View>
        ) : (
          <View>
            <View>
              <DropDownPicker
                items={items}
                containerStyle={{height: 40}}
                style={styles.dropDownStyle}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{
                  backgroundColor: '#fafafa'
                }}
                placeholder="Selecione uma disciplina"
                onChangeItem={(item) => {
                  setSelected(item.value)
                }}
                defaultValue={0}
              />
            </View>
            <View style={styles.gradeContainer}>
              {selected >= 0 ? (
                <View style={styles.infoGradeContainer}>
                  <Text style={styles.disciplineName}>
                    {grades[selected].discipline.name}
                  </Text>
                  <Text style={styles.disciplineGrade}>Média final: {grades[selected].discipline.grade}</Text>
                  {grades[selected].evaluations.map((element) => {
                    return (
                      <View key={element} style={styles.evaluationContainer}>
                        <Text style={styles.evaluationInfo}>{element.code}</Text>
                        <Text style={styles.evaluationInfo}>{
                          element.grades[0] ?  element.grades[0].score : '-'
                        }</Text>
                      </View>
                    )
                  })}
                </View>
              ) : (
                <View><Text>selecione</Text></View>
              )}
            </View>
          </View>
        )}
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -2
  },
  loadingContainer: { 
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center'
  },
  dropDownStyle: {
    backgroundColor: '#fafafa'
  },
  gradeContainer: {
    marginTop: 60,
    zIndex: -1
  },
  infoGradeContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  disciplineName: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20
  },
  disciplineGrade: {
    fontSize: 20,
    marginBottom: 20
  },
  evaluationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
    marginBottom: 10
  },
  evaluationInfo: {
    fontSize: 16 
  }
});

export default Grade;