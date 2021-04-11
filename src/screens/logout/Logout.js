import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Background from '../../components/background/Background'
import api from '../../services/api';
import { AuthContext } from '../../contexts/Auth'

const Logout = ({ navigation }) => {
  const [isLogged, setIsLogged] = useContext(AuthContext)

  const handlePressYes = () => {
    api.get('logout')
    .then((response) => {
      setIsLogged(false)
    })
  }

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            Tem certeza que deseja sair?
          </Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={styles.buttonYes}
              onPress={handlePressYes}
            >
              <Text style={styles.buttonText}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.buttonNo}
              onPress={() => navigation.navigate('Aluno')}
            >
              <Text style={styles.buttonText}>Não</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContainer: {
    backgroundColor: '#fff',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 4,
    borderColor: 'rgba(35, 49, 170, 0.2)',
  },
  messageText: {
    fontSize: 24
  },
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row'
  },
  buttonYes: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(35, 49, 170, 0.1)',
    borderRadius: 10,
    marginRight: 5
  },
  buttonNo: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(35, 49, 170, 0.1)',
    borderRadius: 10
  },
  buttonText: {
    fontSize: 18
  }
});

export default Logout;