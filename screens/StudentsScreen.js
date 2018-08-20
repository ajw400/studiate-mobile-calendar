import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FileSystem } from 'expo'
import { MaterialIcons } from '@expo/vector-icons';
import { login } from '../utils/auth'
import StudentList from '../components/StudentList'
import StudentDetail from '../components/StudentDetail'
import { connect } from 'react-redux'


class StudentsScreen extends React.Component {
  static navigationOptions = {
    title: 'Students',
  }

  componentWillMount = () => {
  }

  render() {
    const { students } = this.props
    return (
        <ScrollView style={styles.container}>
          <StudentList students={students} />
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#fff',
  }
});

mapStateToProps = state => {
  return {
    students: state.students
  }
}

export default connect(mapStateToProps)(StudentsScreen)
