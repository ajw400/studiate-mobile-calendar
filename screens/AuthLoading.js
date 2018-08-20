import React, { Component } from 'react'
import { View, ActivityIndicator, StatusBar, StyleSheet } from 'react-native'
import { isLoggedIn } from '../utils/auth'
import { get } from '../utils/network'
import { connect } from 'react-redux'
import { listStudents } from '../actions/students'


class AuthLoading extends Component {

  componentDidMount() {
    console.log("this.props", this.props)
    this._bootstrapAsync()
  }

  getStudents() {
    const { dispatch } = this.props
    return new Promise(function (resolve, reject) {
      console.log("in promise")
      get('/api/v1/students')
      .then(students => {
          dispatch(listStudents(students))
          resolve(true)
      })
      .catch(err => reject(err))
    })
  }

  _bootstrapAsync = async () => {
    const loggedIn = await isLoggedIn()
    if (loggedIn === true) {
      this.getStudents()
      .then(() => this.props.navigation.navigate('Main'))
    } else {
      this.props.navigation.navigate('Auth')
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(AuthLoading)
