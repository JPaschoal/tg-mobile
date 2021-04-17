import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Background from '../../../components/background/Background'
import api from '../../../services/api';
import { StudentContext } from '../../../contexts/Student'
import StackHeader from '../../../components/stackHeader/StackHeader'

const NotebooksList = () => {
  const [profile] = useContext(StudentContext)
  const [notebooks, setNotebooks] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`notebooks/list/${profile.code}`)
    .then(response => {
      setNotebooks(response.data)
      setLoading(false)
    })
  }, [])

  return (
    <Background>
      <View style={styles.screenContainer}>
        <ScrollView>
          <StackHeader title="Cadernos" />
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            notebooks.length > 0 ? (
              notebooks.map((notebook, index) => {
                return (
                  <View key={index} style={styles.notebookContainer}>
                    <View>
                      <Text>{notebook.name}</Text>
                      <Text>{notebook.subject}</Text>
                    </View>
                    <View style={styles.iconsContainer}>
                      <TouchableOpacity>
                        <Feather name='edit' size={24} color={'#012480'}/>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Feather name='trash-2' size={24} color={'#012480'}/>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })
            ) : (
              <Text>Criar um caderno</Text>
            )
          )}
        </ScrollView>
        <TouchableOpacity styles={styles.plusBtn}>
          <Feather name='plus' size={48} color={'#fff'} style={styles.btnIcon} />
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    position: 'relative'
  },
  notebookContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 5,
    marginBottom: 10,
    padding: 10,
    borderColor: 'rgba(35, 49, 170, 0.1)',
    borderRadius: 10
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
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
  }
});

export default NotebooksList;