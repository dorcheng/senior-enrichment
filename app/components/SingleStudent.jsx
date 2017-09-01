import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditStudentForm from './EditStudentForm';
import store, { fetchStudents } from '../store';

export default class SingleStudent extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
    const fetchStudentsThunk = fetchStudents();
    store.dispatch(fetchStudentsThunk);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render () {
    const studentId = +this.props.match.params.studentId;
    const selectedStudent = this.state.students.filter(student => student.id === studentId)[0];

    if (selectedStudent) {
      return (
          <div className="row">
            <div className="col-lg-4"/>
            <div className="col-lg-4">
              <h4>{selectedStudent.name}</h4>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th><h5>Email</h5></th>
                    <th><h5>Campus</h5></th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{selectedStudent.email}</td>
                    <td><Link to={`/campuses/${selectedStudent.campusId}`} key={selectedStudent.id}>
                      {selectedStudent.school && selectedStudent.school.name}</Link></td>
                  </tr>
                </tbody>
              </table>
            </div>
          <div className="col-lg-4">
            <EditStudentForm selectedStudent={selectedStudent} />
          </div>
        </div>
      );
    }
    else {
      return (<div>Loading...</div>);
    }
  }
}
