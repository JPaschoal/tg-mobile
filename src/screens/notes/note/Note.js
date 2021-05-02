import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';

import Background from '../../../components/background/Background';
import StackHeader from '../../../components/stackHeader/StackHeader';
import api from '../../../services/api';
import { NoteContext } from '../../../contexts/Note'
import { NotebookContext } from '../../../contexts/Notebook'


const CreateNote = ({ navigation }) => {
  const [value, setValue] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [toolbar, setToolbar] = useState(false)
  const [selectedNote] = useContext(NoteContext)
  const [selectedNotebook] = useContext(NotebookContext)

  const _editor = React.createRef();

  useEffect(() => {
    setTimeout(() => {
      setToolbar(true)
    }, 1000)
    if(selectedNote.operation == 'create') {
      setValue('')
      setTitle('')
      setLoading(false)
    }
    else {
      getNote(selectedNote.id)
    }
  }, [])

  const getNote = (id) => {
    api.get(`note/show/${id}`)
    .then((response) => {
      const note = response.data[0]
      setTitle(note.name)
      setValue(note.text)
      setLoading(false)
    })
  }

  const handleSavePress = () => {
    selectedNote.operation == 'create' ? create() : update(selectedNote.id)
  }

  const update = (id) => {
    api.put('notes/update', {
      id,
      name: title,
      text: value
    })
  }

  const create = () => {
    api.post('notes/create', {
      name: title,
      text: value,
      notebook: selectedNotebook
    })
  }

  const handleInsertText = (data) => {
    setValue(data.html)
  }

  return (
    <Background>
        <StackHeader title='Anotação' previous='Anotações' goBackTo={navigation.navigate} save={true} onSave={handleSavePress} />
        {loading ? (
          <View>
            <Text>Loading...</Text>
          </View>
        ) : (
          <View style={{flex: 1, marginBottom: 10}}>
            <TextInput style={styles.noteTitle} value={title} onChangeText={setTitle} />
            <QuillEditor 
              style={styles.editor}
              ref={_editor}
              initialHtml={value}
              theme={{ background: '#fff', color: '#000', placeholder: 'Faça suas anotações aqui' }}
              onHtmlChange={data => handleInsertText(data)}
              />
              {toolbar && <QuillToolbar editor={_editor} options="full" theme="light"  style={styles.bar} />}
          </View>
        )}
    </Background>
  );
}

const styles = StyleSheet.create({
  editor: {
    flex: 1,
    padding: 0,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 10
  },
  bar: {
    zIndex: -1
  },
  noteTitle: {
    backgroundColor: '#fff',
    height: 40,
    padding: 5,
    fontSize: 22,
    textAlign: 'center',
    borderRadius: 10
  }
})

export default CreateNote;