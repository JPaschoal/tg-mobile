import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Circle } from 'react-native-animated-spinkit';

import Background from '../../../components/background/Background'
import StudentHeader from '../../../components/studentHeader/StudentHeader'
import api from '../../../services/api';

const Schedules = ({ navigation }) => {
  const [schedules, setSchedules] = useState()
  const [loading, setLoading] = useState(true)
  const [disciplines, setDisciplines] = useState()
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState(0)

  const weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado']

  useEffect(() => {
    api.get('schedule')
    .then((response) => {
      const sch = response.data
      api.get('enrolledDisciplines')
      .then((response) => {
        const data = response.data;
        const disciplines = data.map((e) => {
          return {name: e.name, code: e.code}
        })
        setDisciplines(disciplines)
        setSchedules(sch)
        setLoading(false)
      })
    })
  }, [])

  useEffect(() => {
    if(schedules) {
      const itemsList = schedules.map((e, index) => {
        const label = weekDays[e.weekday - 1]
        return {label: label, value: index}
      })
      setItems(itemsList)
    }
  }, [schedules])

  const getDisciplineName = (code) => {
    const { name } = disciplines.find(discipline => {
      return discipline.code == code
    })
    return name
  }

  const formatedHours = (date) => {
    const newDate = new Date(date)
    const utcSP = -180
    newDate.setMinutes(newDate.getMinutes() + utcSP)
    return `${newDate.getHours()}:${newDate.getMinutes()}`
  }

  return (
    <Background>
      <View style={styles.container}>
        <StudentHeader 
          title='Horário'
          openDrawer={navigation.openDrawer}
        />
        {loading ? (
          <View style={styles.loadingContainer}>
            <Circle
              size={80}
              color='#012480'
              style={styles.loading}
            />
          </View>
        ) : (
          <>
            <View>
              <DropDownPicker
                items={items}
                containerStyle={{height: 40}}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                dropDownStyle={{
                  backgroundColor: '#fafafa'
                }}
                placeholder="Selecione um dia"
                onChangeItem={(item) => {
                  setSelected(item.value)
                }}
                defaultValue={0}
              />
            </View>
            <View style={styles.schedulesContainer}>
              <View style={styles.schedulesHeader}>
                <Text style={styles.headerTitles}>Disciplina</Text>
                <Text style={styles.headerTitles}>Horário</Text>
              </View>
              {selected >= 0 ? (
                <View style={styles.schedulesItemsContainer}>
                  {schedules[selected].periods.map((element, index) =>  {
                    return(
                      <View key={index} style={styles.schedulesItemContainer}>
                        <Text style={styles.itemText}>{getDisciplineName(element.discipline.code)}</Text>
                        <Text style={styles.itemText}>
                          {formatedHours(element.startAt)} - {formatedHours(element.endAt)}
                        </Text>
                      </View>
                    )
                  })}
                </View>
              ) : (
                <View><Text>selecione</Text></View>
              )}
            </View>
          </>
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
  schedulesContainer: {
    marginTop: 60,
    zIndex: -1
  },
  schedulesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 8,
    borderBottomColor: 'rgba(35, 49, 170, 0.1)',
    paddingBottom: 10
  },
  headerTitles: {
    fontSize: 26
  },
  schedulesItemsContainer: {
    marginTop: 20
  },
  schedulesItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(35, 49, 170, 0.1)',
    paddingBottom: 10
  },
  itemText: {
    fontSize: 16,
    maxWidth: "50%"
  }
})

export default Schedules;