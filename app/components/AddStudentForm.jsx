import React, { Component } from 'react';
import store, { postStudent } from '../store';
import history from '../history';

export default class AddStudentForm extends Component {
  constructor() {
    super();
    this.state = store.getState();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleSubmit (event) {
    event.preventDefault();
    const newStudent = {
      name: event.target.name.value,
      email: event.target.email.value,
      campusId: event.target.campus.value
    };
    const postStudentThunk = postStudent(newStudent);
    store.dispatch(postStudentThunk).then(history.push('/students'));
  }

  render () {
    return (
      <div>
        <h4>Student Form</h4>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="name">Name:</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                placeholder="Enter name"
                name="name"
                type="text" />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="email">Email:</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                placeholder="Enter email"
                name="email"
                type="text" />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="campus">Campus:</label>
            <div className="col-sm-10">
                <select
                  className="form-control"
                  name="campus"
                  required>
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
              <button type="submit" className="btn btn-default">Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
