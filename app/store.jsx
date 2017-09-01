import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import axios from 'axios';

// INITAL STATE

const initialState = {
  campuses: [],
  students: [],
};

// ACTION TYPES

const GET_CAMPUSES = 'GET_CAMPUSES';
const GOT_NEW_CAMPUS_FROM_SERVER = 'GOT_NEW_CAMPUS_FROM_SERVER';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const GET_STUDENTS = 'GET_STUDENTS';
const GOT_NEW_STUDENT_FROM_SERVER = 'GOT_NEW_STUDENT_FROM_SERVER'
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';

// ACTION CREATORS

export function getCampuses (campuses) {
  const action = { type: GET_CAMPUSES, campuses };
  return action;
}

export function gotNewCampusFromServer (campus) {
  const action = { type: GOT_NEW_CAMPUS_FROM_SERVER, campus };
  return action;
}

export function updateCampus (campus) {
  const action = { type: UPDATE_CAMPUS, campus };
  return action;
}

export function deleteCampus (campusId) {
  const action = { type: DELETE_CAMPUS, campusId };
  return action;
}

export function getStudents (students) {
  const action = { type: GET_STUDENTS, students };
  return action;
}

export function gotNewStudentFromServer (student) {
  const action = { type: GOT_NEW_STUDENT_FROM_SERVER, student };
  return action;
}

export function updateStudent (student) {
  const action = { type: UPDATE_STUDENT, student };
  return action;
}

export function deleteStudent (studentId) {
  const action = { type: DELETE_STUDENT, studentId };
  return action;
}

// THUNK CREATORS

export function fetchCampuses () {

  return function thunk (dispatch, getState) {
    return axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => {
        const action = getCampuses(campuses);
        dispatch(action);
      });
  };
}

export function postCampus (newCampus) {

  return function thunk (dispatch, getState) {
    return axios.post('/api/campuses', newCampus)
      .then(res => res.data)
      .then(addedCampus => {
        const action = gotNewCampusFromServer(addedCampus);
        dispatch(action);
      });
  };

}

export function updateSelectedCampus (updatedCampus) {

  return function thunk(dispatch, getState) {
    return axios.put(`/api/campuses/${updatedCampus.id}`, updatedCampus)
    .then(res => res.data)
    .then(editedCampus => {
      const action = updateCampus(editedCampus);
      dispatch(action);
    });
  };

}

export function deleteSelectedCampus (deleteCampusId) {

  return function thunk(dispatch, getState) {
    return axios.delete(`/api/campuses/${deleteCampusId}`)
    .then(res => res.data)
    .then(() => {
      const action = deleteCampus(deleteCampusId);
      dispatch(action);
    });
  };
}

export function fetchStudents () {

  return function thunk (dispatch, getState) {
    return axios.get('/api/students')
      .then(res => res.data)
      .then(students => {
        const action = getStudents(students);
        dispatch(action);
      });
  };
}

export function postStudent (newStudent) {

  return function thunk (dispatch, getState) {
    return axios.post('/api/students', newStudent)
      .then(res => res.data)
      .then(addedStudent => {
        const action = gotNewStudentFromServer(addedStudent);
        dispatch(action);
      });
  };

}

export function updateSelectedStudent (studentData) {

  return function thunk(dispatch, getState) {
    return axios.put(`/api/students/${studentData.id}`, studentData)
    .then(res => res.data)
    .then(editedStudent => {
      const action = updateStudent(editedStudent);
      dispatch(action);
    });
  };

}

export function deleteSelectedStudent (deleteStudentId) {

  return function thunk(dispatch, getState) {
    return axios.delete(`/api/students/${deleteStudentId}`)
    .then(res => res.data)
    .then(() => {
      const action = deleteStudent(deleteStudentId);
      dispatch(action);
    });
  };
}

// REDUCER

const reducer = function(state = initialState, action) {
  switch (action.type) {

    case GET_CAMPUSES:
      return Object.assign({}, state, {campuses: action.campuses});

    case GOT_NEW_CAMPUS_FROM_SERVER:
      return Object.assign({}, state, {campuses: state.campuses.concat(action.campus)});

    case UPDATE_CAMPUS:
      return Object.assign({}, state, {campuses: state.campuses.filter(campus => campus.id !== +action.campus.id).concat(action.campus)});

    case DELETE_CAMPUS:
      return Object.assign({}, state, {campuses: state.campuses.filter(campus => campus.id !== +action.campusId)});

    case GET_STUDENTS:
      return Object.assign({}, state, {students: action.students});

    case GOT_NEW_STUDENT_FROM_SERVER:
      return Object.assign({}, state, {students: state.students.concat(action.student)});

    case UPDATE_STUDENT:
      return Object.assign({}, state, {students: state.students.filter(student => student.id !== +action.student.id).concat(action.student)});

    case DELETE_STUDENT:
      return Object.assign({}, state, {students: state.students.filter(student => student.id !== +action.studentId)});

    default: return state;
  }
};

//STORE
const store = createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()));
export default store;
