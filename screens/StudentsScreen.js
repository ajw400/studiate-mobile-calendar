import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { PHOTOS_DIR } from '../utils/uploadPhoto'
import { FileSystem } from 'expo'
import { MaterialIcons } from '@expo/vector-icons';
import { uploadPhotoAsync} from '../utils/uploadPhoto'
import { login } from '../utils/auth'
import { StudentList } from '../components/StudentList'
import { connect } from 'react-redux'


class StudentsScreen extends React.Component {
  static navigationOptions = {
    title: 'Students',
  }

  componentWillMount = () => {
    console.log(this.props.students)
  }

  render() {
    const { students } = this.props
    return (
      <ScrollView style={styles.container}>
        <Text>Student list</Text>
        <StudentList students={students} />
        <Text>{Object.keys(students).map((key) => {
          return (
            <Text>Text</Text>
            )
        })}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  }
});

mapStateToProps = state => {
  return {
    students: state.students
  }
}

export default connect(mapStateToProps)(StudentsScreen)
