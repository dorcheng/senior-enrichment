import React, { Component } from 'react';
import store, { updateSelectedStudent } from '../store';
import history from '../history';

export default class EditStudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campuses: store.getState().campuses,
      inputName: this.props.selectedStudent.name,
      inputEmail: this.props.selectedStudent.email,
      inputCampusId: this.props.selectedStudent.campusId
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCampusChange = this.handleCampusChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleNameChange (event) {
    this.setState({
      inputName: event.target.value
    });
  }

  handleEmailChange (event) {
    this.setState({
      inputEmail: event.target.value
    });
  }

  handleCampusChange (event) {
    this.setState({
      inputCampusId: event.target.value
    });
  }

  handleUpdate (event) {
    event.preventDefault();
    const studentData = {
      id: this.props.selectedStudent.id,
      name: this.state.inputName,
      email: this.state.inputEmail,
      campusId: this.state.inputCampusId
    };
    const updateSelectedStudentThunk = updateSelectedStudent(studentData);
    store.dispatch(updateSelectedStudentThunk).then(history.push('/students'));
  }

  render () {
    return (
      <div>
        <h4>Edit Student</h4>
        <form className="form-horizontal" onSubmit={this.handleUpdate}>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="name">Name:</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                placeholder="Enter name"
                type="text"
                value={this.state.inputName}
                onChange={this.handleNameChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="email">Email:</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                placeholder="Enter email"
                type="text"
                value={this.state.inputEmail}
                onChange={this.handleEmailChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="campus">Campus:</label>
            <div className="col-sm-10">
                <select
                  className="form-control"
                  name="campus"
                  value={this.state.inputCampusId ? this.state.inputCampusId : undefined}
                  onChange={this.handleCampusChange}>
                  <option key="optionList">Select Campus</option>
                  {
                    this.state.campuses && this.state.campuses.map(campus => (
                      <option key={campus.id} value={campus.id}>{campus.name}</option>
                    ))
                  }
                </select>
              </div>
            </div>
          <br />
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default">Update</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

}
