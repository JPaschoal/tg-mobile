import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';

import Background from '../../../components/background/Background'
import api from '../../../services/api';
import { StudentContext } from '../../../contexts/Student'
import StackHeader from '../../../components/stackHeader/StackHeader'
import CreateNotebook from '../createNotebook/createNotebook'

const NotebooksList = () => {
  const [profile] = useContext(StudentContext)
  const [notebooks, setNotebooks] = useState()
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [operation, setOperation] = useState()
  const [updateNotebook, setUpdateNotebook] = useState()
  const [deleteModal, setDeleteModal] = useState()
  const [selectedDelete, setSelectedDelete] = useState()

  useEffect( () => {
    getNotebooks()
  }, [])

  const getNotebooks = () => {
    api.get(`notebooks/list/${profile.code}`)
    .then(response => {
      setNotebooks(response.data)
      setLoading(false)
    })
  }

  const deleteNotebook = (id) => {
    setLoading(true)
    api.delete('notebooks/delete', { data: { id: id } })
    .then(({ data }) => {
      const { status } = data
      if(status == 'success')
        getNotebooks()
        setLoading(false)
    })
  }

  const handlePressDelete = (id) => {
    setSelectedDelete(id)
    setDeleteModal(true)
  }

  const handleConfirmPress = () => {
    deleteNotebook(selectedDelete)
    setDeleteModal(false)
  }

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
                      <TouchableOpacity onPress={() => {
                        setIsOpen(true)
                        setOperation('update')
                        setUpdateNotebook({
                          id: notebook.id,
                          name: notebook.name,
                          subject: notebook.subject
                        })
                      }}>
                        <Feather name='edit' size={24} color={'#012480'}/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handlePressDelete(notebook.id)}>
                        <Feather name='trash-2' size={24} color={'#012480'}/>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })
            ) : (
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 18}}>Você ainda não tem nenhum caderno</Text>
              </View>
            )
          )}
        </ScrollView>
        <TouchableOpacity 
          styles={styles.plusBtn}  
          onPress={() => {
            setOperation('create')
            setIsOpen(true)
          }
        }
          >
          <Feather name='plus' size={48} color={'#fff'} style={styles.btnIcon} />
        </TouchableOpacity>
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
        <Modal
          animationIn='slideInUp'
          isVisible={isOpen}
          style={styles.modal}
          backdropColor="transparent"
        >
          { operation == 'create' && (
            <CreateNotebook 
              title='Criar novo caderno' 
              name='' subject='' 
              operation={operation}
              closeModal={setIsOpen}
              student={profile.code}
              refresh={getNotebooks}
            />
          )}
          { operation == 'update' &&(
            <CreateNotebook 
              title='Editar caderno' 
              name={updateNotebook.name} 
              subject={updateNotebook.subject} 
              operation={operation} 
              id={updateNotebook.id}
              closeModal={setIsOpen}
              refresh={getNotebooks}
            />
          )}
        </Modal>

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
  }
});

export default NotebooksList;