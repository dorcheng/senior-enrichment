import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store, { fetchStudents, deleteSelectedStudent } from '../store';

export default class AllStudents extends Component {
  constructor() {
    super();
    this.state = store.getState();
    this.handleDelete = this.handleDelete.bind(this);
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

  handleDelete (event) {
    const studentId = event.target.id;
    const deleteSelectedStudentThunk = deleteSelectedStudent(studentId);
    store.dispatch(deleteSelectedStudentThunk);
  }

  render () {
    const students = this.state.students;

    return (
      <div>
        <div className="row">
          <div className="col-lg-4" />
          <div className="col-lg-5">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th><h4>Name</h4></th>
                  <th><h4>Campus</h4></th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => {
                  return (
                    <tr key={student.id}>
                      <td><Link to={`/students/${student.id}`}>{student.name}</Link></td>
                      {
                        student.school ? <td><Link to={`/campuses/${student.campusId}`}>{student.school.name}</Link></td> : <td className="reassign">Reassign</td>
                      }
                      <td>
                        <button
                          id={student.id}
                          type="button"
                          className="btn btn-danger"
                          onClick={this.handleDelete}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="col-lg-3">
            <Link to={'/students/add-student'}>
              <button
                type="button"
                className="btn btn-info create">
                + ADD NEW STUDENT
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
