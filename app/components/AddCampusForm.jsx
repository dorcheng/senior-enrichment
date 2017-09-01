import React, { Component } from 'react';
import store, { postCampus } from '../store';
import history from '../history';

export default class AddCampusForm extends Component {
  constructor() {
    super();
    this.state = store.getState();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleSubmit (evt) {
    evt.preventDefault();
    const newCampus = {
      name: evt.target.name.value,
      location: evt.target.location.value,
      imageUrl: evt.target.imageUrl.value
    }
    const postCampusThunk = postCampus(newCampus);
    store.dispatch(postCampusThunk);
    history.push('/campuses');
  }

  render () {
    return (
      <div>
        <h4>Campus Form</h4>
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
            <label className="control-label col-sm-2" htmlFor="email">Location:</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                placeholder="Enter location"
                name="location"
                type="text" />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="imageUrl">ImageUrl:</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                placeholder="Enter imageUrl"
                name="imageUrl"
                type="text" />
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
