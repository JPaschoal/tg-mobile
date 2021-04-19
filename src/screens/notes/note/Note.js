import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';

import Background from '../../../components/background/Background';
import StackHeader from '../../../components/stackHeader/StackHeader';
import api from '../../../services/api';


const CreateNote = ({ navigation }) => {
  const [value, setValue] = useState('')
  const _editor = React.createRef();

  return (
    <Background>
        <StackHeader title='Anotação' previous='Anotações' goBackTo={navigation.navigate} save={true} />
        <View style={{flex: 1, marginBottom: 10}}>
          <TextInput style={styles.noteTitle} />
          <QuillEditor 
            style={styles.editor}
            ref={_editor}
            initialHtml=""
            theme={{ background: '#fff', color: '#000', placeholder: 'Faça suas anotações aqui' }}
            />
            <QuillToolbar editor={_editor} options="full" theme="light"  style={styles.bar} />
        </View>
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
    paddingBottom: 15,
    fontSize: 22,
    textAlign: 'center',
    borderRadius: 10
  }
})

export default CreateNote;