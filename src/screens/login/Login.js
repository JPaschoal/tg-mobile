import React from 'react';
import { useState } from 'react';
import { Image, StyleSheet, View, Text, TextInput, Button, TouchableOpacity, Linking } from 'react-native';
import Modal from 'react-native-modal';
import { Circle } from 'react-native-animated-spinkit'

import Background from '../../components/background/Background'
import api from '../../services/api'
import Logo from '../../../assets/Logo-login.png'

const Login = ({ setIsLogged }) => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [modalLogin, setModalLogin] = useState(false)

  const onClickButton = () => {
    setLoading(true)
    if(user == '' || password == ''){
      setLoading(false)
      setModalLogin(true)
    }
    api.post('login', {
      login: user,
      password: password
    })
    .then(({ data }) => {
      setLoading(false)
      const { status } = data
      status == true ? (
        setIsLogged(true)
      ) : (
        setModalLogin(true)
      )
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image 
            source={Logo}
          />
        </View>
        <View style={styles.inputsContainer}>
          <View style={styles.userContainer}>
            <Text style={styles.userLabel}>
              Usuário:
            </Text>
            <TextInput
              placeholder='Digite seu usuário'
              value={user}
              onChangeText={setUser}
              style={styles.userInput}
            />
          </View>
          <View style={styles.passwordContainer}>
            <Text style={styles.passwordLabel}>
              Senha:
            </Text>
            <TextInput 
              placeholder='Digite sua senha'
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              style={styles.passwordInput}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          {loading ? (
            <Circle 
              size={30}
              color='#012480'
              style={styles.loading}
            />
          ) : (
            <TouchableOpacity
              onPress={onClickButton}
              style={styles.signinButton}
            > 
              <Text style={styles.signinText}>Entrar</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            style={styles.forgotText}
            onPress={() => {
              Linking.openURL('https://siga.cps.sp.gov.br/aluno')
            }}
          >
            <Text>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationIn='slideInUp'
          isVisible={modalLogin}
          style={styles.modal}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Usuário ou senha incorreto
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalLogin(false)
              }}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logoContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },

  inputsContainer: {
    flex: 1,
    alignItems: 'baseline',
    width: '100%',
    paddingHorizontal: '15%'
  },
  userLabel: {
    fontSize: 20
  },
  userInput: {
    marginTop: 10,
    backgroundColor: '#FFF',
    paddingVertical: 5,
    paddingLeft: 10,
    paddingRight: '50%',
    alignItems: 'stretch',
    borderRadius: 10,
    alignSelf: 'stretch',
    height: 40,
    fontSize: 14,
    fontFamily: 'Roboto'
  },
  passwordLabel: {
    marginTop: 22,
    fontSize: 20
  },
  passwordInput: {
    marginTop: 10,
    backgroundColor: '#FFF',
    paddingVertical: 5,
    paddingLeft: 10,
    paddingRight: '50%',
    alignItems: 'stretch',
    borderRadius: 10,
    alignSelf: 'stretch',
    height: 40,
    fontSize: 14,
    fontFamily: 'Roboto'
  },

  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  signinButton: {
    backgroundColor: '#0232AD',
    paddingHorizontal: "10%",
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 30
  },
  signinText: {
    fontSize: 19,
    color: '#FFFF'
  },
  loading: {
    marginTop: 30
  },
  forgotText: {
    marginTop: 30,
    color: '#192d92'
  },

  modal: {
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: '#FFFF',
    alignItems: 'center',
    width: '60%',
    padding: 10,
    borderRadius: 10
  },
  modalText: {
    fontSize: 14,
    textAlign: 'center'
  },
  modalButton: {
    paddingTop: 5,
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: 'rgba(35, 49, 170, 0.1)',
    alignItems: 'center',
    width: '100%'
  },
  modalButtonText: {
    color: '#192d92'
  }
});

export default Login;