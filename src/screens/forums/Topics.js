import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, StyleSheet, TextInput, Touchable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';

import Background from '../../components/background/Background';
import StackHeader from '../../components/stackHeader/StackHeader';
import { ForumContext } from '../../contexts/Forum'
import api from '../../services/api';
import { StudentContext } from '../../contexts/Student'

const Topics = ({ navigation }) => {

  const { subject } = useContext(ForumContext)
  const [profile] = useContext(StudentContext)
  const [selectedSubject, setSelectedSubject] = subject
  const [topics, setTopics] = useState()
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [topicText, setTopicText] = useState('')
  const [topicName, setTopicName] = useState('')

  useEffect(() => {
    getTopics()
  }, [])

  const getTopics = () => {
    api.get(`/forums/topics/list/Análise e desenvolvimento de sistemas/${selectedSubject}`)
    .then(response => {
      setTopics(response.data)
      setLoading(false)
    })
  }

  const createTopic = () => {
    const data = {
      name: topicName,
      text: topicText,
      course: 'Análise e desenvolvimento de sistemas',
      subject: selectedSubject,
      student: profile.code
    }
    api.post('/forums/topics/create', data)
    .then(() => {
      setTopicText('')
      setTopicName('')
      getTopics()
    })
  }


  return (
    <Background>
      <StackHeader title="Tópicos" previous="SubForum" goBackTo={navigation.navigate}/>
      <ScrollView>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          topics.map((topic, index) => {
            return(
              <TouchableOpacity 
                key={index}
                style={styles.topicBtn}
              >
                <Text style={styles.topicTxt}>{topic.name}</Text>
              </TouchableOpacity>
            )
          })
        )}
      </ScrollView>
      <TouchableOpacity 
        styles={styles.plusBtn}  
        onPress={() => {
            setOpen(true)
          }
        }
      >
        <Feather name='plus' size={48} color={'#fff'} style={styles.btnIcon} />
      </TouchableOpacity>
      <Modal
          animationIn='slideInUp'
          isVisible={open}
          style={styles.modal}
          backdropColor="transparent"
        >
          <View style={styles.container}>
            <Text style={styles.modalTitle}>Criar novo topico</Text>
            <View style={styles.txtContainer} >
              <TextInput
                placeholder="Nome do tópico"
                onChangeText={setTopicName}
                value={topicName}
                style={styles.textInput}
              />
              <TextInput 
                multiline={true}
                numberOfLines={5}
                placeholder="Digite aqui..."
                underlineColorAndroid='transparent'
                require={true}
                style={styles.textInput}
                value={topicText}
                onChangeText={setTopicText}
              />
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.createBtn} onPress={() => {
                createTopic()
                setOpen(false)
              }}>
                <Text style={styles.createText}>Criar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {
                  setOpen(false)
                  setTopicText('')
                  setTopicName('')
                }}
                style={styles.cancelBtn}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    </Background>
  );  
}

const styles = StyleSheet.create({
  topicBtn: {
    marginBottom: 10,
    paddingVertical: 15,
    borderColor: 'rgba(35, 49, 170, 0.1)',
    borderWidth: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  topicTxt: {
    fontSize: 18
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
  },
  modal: {
    alignItems: 'center'
  },
  container: {
    backgroundColor: '#A1B9F8',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%'
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 24
  },
  txtContainer: {
    width: '100%'
  },
  textInput: {
    fontSize: 18,
  },
  btnContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  createBtn: {
    backgroundColor: '#0232AD',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 10
  },
  createText: {
    color: '#fff',
    fontSize: 18
  },
  cancelBtn: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  cancelText: {
    fontSize: 16,
    color: '#192d92'
  }
});

export default Topics;