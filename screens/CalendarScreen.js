import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { get, post } from '../utils/network'
import { loadStudentList, listStudents } from '../actions/students'
import {
  Ionicons,
  MaterialIcons,
  Foundation,
  MaterialCommunityIcons,
  Octicons
} from '@expo/vector-icons';
import {Agenda} from 'react-native-calendars';


class CalendarScreen extends Component {
  state = {
    appointments: {},
    selectedDay: this.timeToString(),
  }

  componentWillMount() {
    get('/api/v1/students').then(students => this.props.dispatch(listStudents(students)))
  }

  timeToString() {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }

  loadMonth = (selectedDay) => {
    newMonth = new Date(selectedDay).getMonth()
    oldMonth = new Date(this.state.selectedDay).getMonth()
    console.log("months", oldMonth, newMonth)
    if (newMonth != oldMonth) {
      get(`/api/v1/appointments/${selectedDay.dateString}`)
      .then(appointments => this.setState(
        { ...this.state,
          appointments:
            {...this.state.appointments, ...appointments},
          selectedDay }))
    }
  }

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}><Text></Text></View>
    );
  }

  rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  }

  renderItem = (item) => {
    const { students } = this.props
    const student = students[item.student_id]
    return (
      <View style={[styles.item, {height: item.length}]}><Text>{student.first_name} {student.last_name}</Text></View>
    );
  }

  render() {
    const { appointments, selectedDay } = this.state

    return(
      <Agenda
        loadItemsForMonth={this.loadMonth}
        items={appointments}
        renderEmptyDate={this.renderEmptyDate}
        renderItem={this.renderItem}
        rowHasChanged={this.rowHasChanged}
        selected={selectedDay}

      />

      )
  }

}


const mapStateToProps = (state) => {
  return {
    students: state.students
    }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
})

export default connect(mapStateToProps)(CalendarScreen)
