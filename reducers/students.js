import { LIST_STUDENTS } from '../actions/students';

export const students = (state = {}, action) => {
  console.log("in reducer, action.type ", action.type)
  switch (action.type) {
    case LIST_STUDENTS:
      console.log("in reducer list students")
      return { ...state, students: {...action.students} }
    default:
      return state;
  }
};
