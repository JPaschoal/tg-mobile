import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Background from '../../../components/background/Background'
import api from '../../../services/api';

const Notebooks = () => {
  const [notebooks, setNotebooks] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('notebooks/list/1830481821028')
    .then(response => {
      setNotebooks(response.data)
      setLoading(false)
    })
  }, [])

  return (
    <Background>
      <View>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          notebooks.length > 0 ? (
            notebooks.map((notebook, index) => {
              return (<Text key={index}>{notebook.name}</Text>)
            })
          ) : (
            <Text>Criar um caderno</Text>
          )
        )}
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Notebooks;