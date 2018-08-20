import React, { Component } from 'react';
import { connect } from 'react-redux'
import moment from 'moment';
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
import { changeToken } from '../utils/auth'
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
  mounted = false

  state = {
    appointments: {},
    selectedDay: this.timeToString(),
  }

  componentDidMount() {
    this.mounted = true
    get('/api/v1/students')
    .then(students => {
      if (this.mounted === true){
        this.props.dispatch(listStudents(students))
      }
    })
    .catch(err => this.props.navigation.navigate('Auth'))
    changeToken("new val")
  }

  componentWillUnmount() {
    this.mounted = false
  }

  timeToString() {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }

  loadMonth = (selectedDay) => {
    newMonth = new Date(selectedDay).getMonth()
    oldMonth = new Date(this.state.selectedDay).getMonth()
    if (newMonth != oldMonth) {
      get(`/api/v1/appointments/${selectedDay.dateString}`)
      .then(
        appointments => {
         if (this.mounted === true) {
            this.setState(
            { ...this.state,
              appointments:
                {...this.state.appointments, ...appointments},
              selectedDay
            })
          }
        }
      )
      .catch(err => {
        console.log("catch error loadmonth ", err)
        this.props.navigation.navigate('Auth')})
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

  renderItem = (appt) => {
    const { students } = this.props
    const student = students[appt.student_id]
    return (
      <View style={[styles.appt, {height: appt.length * 2}]}>
        <Text>{student.first_name} {student.last_name} | {appt.length} min.</Text>
        <Text>{moment(appt.date_time).format('llll')} - {moment(appt.end_time).format('LT')}</Text>
        <Text>{appt.status}</Text>
      </View>
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
  appt: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 30,
    flex:1,
    paddingTop: 30
  }
})

export default connect(mapStateToProps)(CalendarScreen)
