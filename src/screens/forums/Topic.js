import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';

import Background from '../../components/background/Background';
import StackHeader from '../../components/stackHeader/StackHeader';
import { ForumContext } from '../../contexts/Forum'
import { StudentContext } from '../../contexts/Student'
import api from '../../services/api';
import Comment from './Comment'

const Topic = ({ navigation }) => {

  const [profile] = useContext(StudentContext)
  const { topic } = useContext(ForumContext)
  const [selectedTopic, setSelectedTopic] = topic
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState()
  const [loadingComments, setLoadginComments] = useState(true)
  const [open, setOpen] = useState(false)
  
  useEffect(() => {
    getComments()
  }, [])

  const getComments = () => {
    api.get(`forums/topics/comments/${selectedTopic.id}`)
    .then((response) => {
      setComments(response.data)
      setLoadginComments(false)
    })
  }

  const createComment = () => {
    const data = {
      name: 'comment',
      text: commentText,
      student: profile.code,
      topic: selectedTopic.id
    }
    api.post('forums/topics/comments/create', data)
    .then(response => {
      setCommentText('')
      getComments()
    })
  }

  return (
    <Background>
      <StackHeader title='Tópico' previous="Topics" goBackTo={navigation.navigate}/>
      <ScrollView>
        <View style={styles.topic}>
          <Text style={styles.title}>{selectedTopic.name}</Text>
          <Text style={styles.text}>{selectedTopic.text}</Text>
          <Text style={styles.autor}>Autor: {selectedTopic.student.ra}</Text>
        </View>
        <View style={styles.comments}>
          <View style={styles.commentsHeader}>
            <Text style={styles.commentsHeaderTitle}>Comentários: </Text>
          </View>
          <View>
            {
              loadingComments ? (
                <Text>Loading...</Text>
              ) : (
                comments.length > 0 ? (
                  <View>
                    {
                      comments.map((comment, index) => {
                        return(
                          <Comment comment={comment} key={index}/>
                        )
                      })
                    }
                    <TouchableOpacity onPress={() => setOpen(true)} style={styles.addCommentBtn}>
                      <Feather name='plus' size={48} color={'#192d92'} style={styles.btnIcon} />
                      <Text>Adicionar comentário</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => setOpen(true)} style={styles.addCommentBtn}>
                    <Feather name='plus' size={48} color={'#192d92'} style={styles.btnIcon} />
                    <Text>Adicionar comentário</Text>
                  </TouchableOpacity>
                )
              )
            }
          </View>
        </View>
      </ScrollView>
      <Modal
        animationIn='slideInUp'
        isVisible={open}
        style={styles.modal}
        backdropColor="transparent"
      >
        <View style={styles.container}>
          <Text style={styles.modalTitle}>Adicionar comentário</Text>
          <View style={styles.txtContainer}>
            <TextInput
              multiline={true}
              numberOfLines={5}
              placeholder="Digite aqui..."
              underlineColorAndroid='transparent'
              require={true}
              style={styles.textInput}
              value={commentText}
              onChangeText={setCommentText}
              style={styles.textInput}
            />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity 
              style={styles.createBtn} 
              onPress={() => {
                createComment()
                setOpen(false)
              }}
            >
              <Text style={styles.createText}>Comentar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.cancelBtn}
              onPress={() => {
                setCommentText('')
                setOpen(false)
              }}
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
  topic: {
    paddingBottom: 15,
    borderBottomColor: 'rgba(35, 49, 170, 0.1)',
    borderBottomWidth: 5,
    borderRadius: 10,
    marginBottom: 15
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    marginBottom: 10
  },
  autor: {
    fontSize: 12
  },
  commentsHeader: {
    marginBottom: 10,
  },
  commentsHeaderTitle: {
    fontSize: 18
  },
  addCommentBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
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
})

export default Topic;