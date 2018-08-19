import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export class StudentList extends Component {
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
          renderItem={({item}) => <ListItem item={item} />}
        />
      </View>
    );
  }
}

const ListItem = ({ item }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.item}>{item.first_name} {item.last_name}</Text>
      <Text style={styles.item}>{item.phone}</Text>
      <Text style={styles.item}>{item.is_active ? 'active' : 'inactive'}</Text>
    </View>
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
