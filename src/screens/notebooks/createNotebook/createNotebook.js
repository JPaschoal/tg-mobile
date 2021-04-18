import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import api from '../../../services/api';

const CreateNotebook = ({ title, name, subject, operation, id, closeModal, student, refresh }) => {
  const [nameValue, setNameValue] = useState('')
  const [subjectValue, setSubjectValue] = useState('')
  const [btnText, setBtnText] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    operation == 'create' ? (
      setBtnText('Criar'),
      setLoading(false)
    ) : (
      setNameValue(name),
      setSubjectValue(subject),
      setBtnText('Editar'),
      setLoading(false)
    )
  }, [])

  const handleConfirmPress = () => {
    if(operation == 'create') {
      api.post('notebooks/create', {
          name: nameValue,
          subject: subjectValue,
          student: student
      })
      .then((response) => {
        closeModal(false)
        refresh()
      })
    }
    else{
      api.put('notebooks/update', {
        id: id,
        name: nameValue,
        subject: subjectValue
      })
      .then((response) => {
        closeModal(false)
        refresh()
      })
    }
  }

  return (
    loading ? (
      <View>
        <Text>Loading...</Text>
      </View>
    ) : (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome:</Text>
          <TextInput onChangeText={setNameValue} value={nameValue} style={styles.input} />
          <Text style={styles.label}>Matéria: </Text>
          <TextInput onChangeText={setSubjectValue} value={subjectValue} style={styles.input} />
        </View>
        <TouchableOpacity style={styles.createBtn} onPress={handleConfirmPress}>
          <Text style={styles.createText}>{btnText}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {closeModal(false)}}>
          <Text>Cancelar</Text>
        </TouchableOpacity>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A1B9F8',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 30
  },
  label: {
    fontSize: 18
  },
  input: {
    marginTop: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 40,
    fontSize: 18,
    width: 200,
    marginBottom: 15,
    padding: 5
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

export default CreateNotebook;