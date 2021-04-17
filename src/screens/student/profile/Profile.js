import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Circle } from 'react-native-animated-spinkit'

import Background from '../../../components/background/Background'
import StudentHeader from '../../../components/studentHeader/StudentHeader';
import api from '../../../services/api'
import userPicture from '../../../../assets/user-picture.png'
import { StudentContext } from '../../../contexts/Student';

const Profile = ({ navigation }) => {
  const [profile, setProfile] = useContext(StudentContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('perfil')
    .then(response => {
      setProfile(response.data)
      setLoading(false)
    })
  }, [])

  let formatedDate
  if(profile){
    const date = new Date(profile.birthday)
    formatedDate = ((date.getDate()) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear()) 
  }

  return (
    <Background>
      <StudentHeader title="Perfil" openDrawer={navigation.openDrawer}/>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Circle 
            size={80}
            color='#012480'
            style={styles.loading}
          />
        </View>
      ) : (
        <View>
          <View style={styles.imageContainer}>
            <Image
              source={userPicture}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infos}>Nome: {profile.name}</Text>
            <Text style={styles.infos}>Email: {profile.email}</Text>
            <Text style={styles.infos}>CPF: {profile.cpf}</Text>
            <Text style={styles.infos}>RA: {profile.code}</Text>
            <Text style={styles.infos}>Data de nascimento: {formatedDate}</Text>
            <Text style={styles.infos}>{profile.unit}</Text>
            <Text style={styles.infos}>Curso: {profile.course}</Text>
            <View style={styles.infoWrapper}>
              <Text style={styles.infos}>Periodo: {profile.period}</Text>
              <Text style={styles.infos}>PP: {profile.progress}</Text>
              <Text style={styles.infos}>PR: {profile.averageGrade}</Text>
            </View>
          </View>
        </View>
      )}
    </Background>
  );
}


const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
    borderBottomWidth: 8,
    borderBottomColor: 'rgba(35, 49, 170, 0.1)'
  },
  infoContainer: {
    marginTop: 20
  },
  infoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  infos: {
    marginTop: 10,
    fontSize: 16
  }
})

export default Profile;