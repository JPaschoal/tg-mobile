import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Circle } from 'react-native-animated-spinkit';
import DropDownPicker from 'react-native-dropdown-picker';

import Background from '../../components/background/Background';
import StudentHeader from '../../components/studentHeader/StudentHeader';
import api from '../../services/api';

const Grade = ({ navigation }) => {
  const [grades, setGrades] = useState()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])

  useEffect(() => {
    api.get('grades')
    .then((response) => {
      setGrades(response.data)
      setLoading(false)

      const itemsList = grades.map((element) => {
        return {label: element.discipline.name, value: element.discipline.code}
      })

      setItems(itemsList)
    })
  }, [])

  return (
    <Background>
      <StudentHeader title="Notas" openDrawer={navigation.openDrawer} />
      {loading ? (
        <Circle
          size={80}
          color='#012480'
          style={styles.loading}
        />
      ) : (
        <View>
          <DropDownPicker
            items={items}
            containerStyle={{height: 40}}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            placeholder="Selecione uma disciplina"
            onChangeItem={(item) => {console.warn(item.value)}}
          />
        </View>
      )}
    </Background>
  );
}

const styles = StyleSheet.create({
});

export default Grade;