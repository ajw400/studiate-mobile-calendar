import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation'

class StudentList extends Component {
  render() {
    const { students } = this.props
    let student_array = []
    Object.keys(students).map((key) =>
      student_array.push({
        "key": key,
        ...students[key]
      }))
    return (
      <View style={styles.container}>
        <FlatList
          data={student_array}
          renderItem={({item}) => <ListItem
            item={item}
            onPress={() => this.props.navigation.navigate('StudentDetail', {student: item})} />}
        />
      </View>
    );
  }
}

const ListItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Text style={styles.item}>{item.first_name} {item.last_name}</Text>
      <Text style={styles.item}>{item.phone}</Text>
      <Text style={styles.item}>{item.is_active ? 'active' : 'inactive'}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

export default withNavigation(StudentList)
