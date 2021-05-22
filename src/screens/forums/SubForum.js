import React, { useContext } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView } from 'react-native';
import Background from '../../components/background/Background';
import StackHeader from '../../components/stackHeader/StackHeader';
import { ForumContext } from '../../contexts/Forum'

const SubForum = ({ navigation }) => {

  const { subForum, semester, subject } = useContext(ForumContext)

  const [selectedSubForum, setSelectedSubForum] = subForum
  const [selectedSemester, setSelectedSemester] = semester
  const [selectedSubject, setSelectedSubject] = subject

  return (
    <Background>
      <StackHeader title={selectedSemester} previous="Forum" goBackTo={navigation.navigate}  />
      <ScrollView>
        {
          selectedSubForum.map((subject, index) => {
            return (
              <TouchableOpacity 
                key={index}
                style={styles.subForumBtn}
                onPress={() => {
                  setSelectedSubject(subject)
                  navigation.navigate('Topics')
                }}
              >
                <Text style={styles.subForumTxt}>{subject}</Text>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  subForumBtn: {
    marginBottom: 10,
    paddingVertical: 15,
    borderColor: 'rgba(35, 49, 170, 0.1)',
    borderWidth: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  subForumTxt: {
    fontSize: 14
  }
});

export default SubForum;