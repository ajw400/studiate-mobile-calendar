import React, { Component } from 'react'
import { View, Button, StyleSheet } from 'react-native'
import { login } from '../utils/auth'
import { connect } from 'react-redux'
import { listStudents } from '../actions/students'

class Auth extends Component {

  render() {
    return(
      <View style={styles.container}>
        <Button title="Sign in" onPress={this.loginAsync} />
      </View>
      )
  }

  getStudents() {
    const { dispatch } = this.props
    return new Promise(function (resolve, reject) {
      get('/api/v1/students')
      .then(students => {
          dispatch(listStudents(students))
          resolve(true)
        })
      .catch(err => reject(err))
    })
  }

  loginAsync = async () => {
    login()
    .then(() => this.getStudents)
    .then(() => this.props.navigation.navigate("Main"))
    .catch(err => console.log("error", err))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default connect()(Auth)
