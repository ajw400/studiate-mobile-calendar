import { BASE_URL, get } from '../utils/network'
export const GET_STUDENTS = 'GET_STUDENTS';
export const LIST_STUDENTS = 'LIST_STUDENTS'

const errorMessage = (error) => console.log(error)

// export const loadStudentList = () => {
//   console.log("load student list")
//   return function (dispatch) {
//     console.log("in dispatch", dispatch)
//       get(`/api/v1/students`).then(
//         students => dispatch(listStudents(students),
//         error => dispatch(errorMessage(error))))
//   }
// }

export const loadStudentList = () => dispatch => (
      get(`/api/v1/students`).then(students => dispatch(listStudents(students)))
);

export function listStudents (students) {
  return {
    type: LIST_STUDENTS,
    students
  }
}


