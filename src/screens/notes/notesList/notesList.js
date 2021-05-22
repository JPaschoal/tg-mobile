import React, { useContext, useState, useEffect} from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';

import Background from '../../../components/background/Background';
import StackHeader from '../../../components/stackHeader/StackHeader';
import { NotebookContext } from '../../../contexts/Notebook'
import { NoteContext } from '../../../contexts/Note'
import FABCreationButton from '../../../components/FABCreateButton/FABCreateButton'
import api from '../../../services/api';

const NotesList = ({ navigation }) => {
  const [selectedNotebook] = useContext(NotebookContext)
  const [selectedNote, setSelectedNote] = useContext(NoteContext)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDelete, setSelectedDelete] = useState()
  const [deleteModal, setDeleteModal] = useState()

  useEffect(() => {
    getNotes()
  }, [])

  const getNotes = () => {
    api.get(`notes/list/${selectedNotebook}`)
    .then((response) => {
      setNotes(response.data)
      setLoading(false)
    })
  }

  const deleteNote = (id) => {
    setLoading(true)
    api.delete('notes/delete', { data: { id: id } })
    .then(({ data }) => {
      const { status } = data
      if(status == 'success') {
        getNotes()
        setLoading(false)
      }
    })
  }

  const handlePressDelete = (id) => {
    setSelectedDelete(id)
    setDeleteModal(true)
  }

  const handleConfirmPress = () => {
    deleteNote(selectedDelete)
    setDeleteModal(false)
  }

  const handleNotePress = (id) => {
    setSelectedNote({
      id,
      operation: 'update'
    })
    navigation.navigate('Anotação')
  }

  const handleCreatePress = () => {
    setSelectedNote({
      id: undefined,
      operation: 'create'
    })
    navigation.navigate('Anotação')
  }

  return (
    <Background>
      <StackHeader title="Anotações" previous="Cadernos" goBackTo={navigation.navigate} />
      <View style={styles.screenContainer}>
        <ScrollView>
          {loading ? (
            <View><Text>Loading...</Text></View>
          ) : (
            notes.length > 0 ? (
              notes.map((note, index) => {
                return(
                  <TouchableOpacity key={index} onPress={() => {handleNotePress(note.id)}}>
                    <View style={styles.noteContainer}>
                      <Text style={styles.noteName}>{note.name}</Text>
                      <TouchableOpacity onPress={() => handlePressDelete(note.id)}>
                        <Feather name='trash-2' size={24} color={'#012480'}/>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                )
              })
            ) : (
              <View><Text>Não existe nenhuma anotação neste caderno</Text></View>
            )
          )}
        </ScrollView>
        <Modal
          animationIn='slideInUp'
          isVisible={deleteModal}
          style={styles.deleteModal}
          backdropColor="transparent"
        >
          <View style={styles.deleteModalContainer}>
            <Text style={styles.titleModal}>Tem certeza que deseja excluir este caderno?</Text>
            <View style={styles.modalBtnsContainer}>
              <TouchableOpacity style={styles.modalBtnConfirm}>
                <Text style={styles.confirmText} onPress={handleConfirmPress}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtnCancel} onPress={() => { setDeleteModal(false)}}>
                <Text style={styles.cancelText}>Não</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* <FABCreationButton setOpen={setIsOpen} setOperation={setOperation} /> */}
        <TouchableOpacity 
          styles={styles.plusBtn}  
          onPress={handleCreatePress}
        >
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
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 5,
    marginBottom: 10,
    padding: 10,
    borderColor: 'rgba(35, 49, 170, 0.1)',
    borderRadius: 10
  },
  noteName: {
    fontSize: 18
  },
  modal: {
    alignItems: 'center'
  },
  deleteModal: {
    alignItems: 'center'
  },
  deleteModalContainer: {
    backgroundColor: '#A1B9F8',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10
  },
  titleModal: {
    fontSize: 24,
    textAlign: 'center'
  },
  modalBtnsContainer: {
    flexDirection: 'row',
    marginTop: 15
  },
  modalBtnConfirm: {
    backgroundColor: '#0232AD',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 10,
    borderRadius: 10
  },
  confirmText: {
    fontSize: 18,
    color: '#fff'
  },
  modalBtnCancel: {
    backgroundColor: '#0232AD',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10
  },
  cancelText: {
    fontSize: 18,
    color: '#fff'
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
})

export default NotesList;