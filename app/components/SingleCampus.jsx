import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditCampusForm from './EditCampusForm';
import store, { fetchCampuses, deleteSelectedStudent } from '../store';

export default class SingleCampus extends Component {
  constructor() {
    super();
    this.state = store.getState();
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
    const fetchCampusesThunk = fetchCampuses();
    store.dispatch(fetchCampusesThunk);
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  handleDelete (event) {
    const studentId = event.target.id;
    const deleteSelectedStudentThunk = deleteSelectedStudent(studentId);
    store.dispatch(deleteSelectedStudentThunk);
  }

  render () {
    const campusId = +this.props.match.params.campusId;
    const selectedCampus = this.state.campuses.filter(campus => campus.id === campusId)[0];
    const selectedCampusStudents = this.state.students.filter(student => student.campusId === campusId);

    if (selectedCampus) {
      return (
          <div className="row">
            <div className="col-lg-4" />
            <div className="col-lg-4">
              <h4>{selectedCampus.name}</h4>
              <div>Location: {selectedCampus.location}
                <Link to={'/students/add-student'}>
                  <button
                    type="button"
                    className="btn btn-info addstudent">
                    + ADD NEW STUDENT
                  </button>
                </Link>
              </div>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th><h5>Name</h5></th>
                    <th><h5>Email</h5></th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCampusStudents && selectedCampusStudents.map(student => {
                    return (
                      <tr key={student.id}>
                        <td><Link to={`/students/${student.id}`} key={student.id}>
                          {student.name}</Link></td>
                        <td>{student.email}</td>
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
            <div className="col-lg-4">
              <EditCampusForm selectedCampus={selectedCampus} />
            </div>
          </div>
      );
    }
    else {
      return (<div>Loading...</div>);
    }
  }
}
