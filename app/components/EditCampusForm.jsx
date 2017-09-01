import React, { Component } from 'react';
import store, { updateSelectedCampus } from '../store';
import history from '../history';

export default class AddCampusForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputName: this.props.selectedCampus.name,
      inputLocation: this.props.selectedCampus.location,
      inputImageUrl: this.props.selectedCampus.imageUrl
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleImageUrlChange = this.handleImageUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange (event) {
    this.setState({
      inputName: event.target.value
    });
  }

  handleLocationChange (event) {
    this.setState({
      inputLocation: event.target.value
    });
  }

  handleImageUrlChange (event) {
    this.setState({
      inputImageUrl: event.target.value
    });
  }

  handleSubmit (event) {
    event.preventDefault();
    const updatedCampus = {
      id: this.props.selectedCampus.id,
      name: this.state.inputName,
      location: this.state.inputLocation,
      imageUrl: this.state.inputImageUrl
    };
    const updateSelectedCampusThunk = updateSelectedCampus(updatedCampus);
    store.dispatch(updateSelectedCampusThunk).then(history.push('/campuses'));
  }

  render () {
    return (
      <div>
        <h4>Edit Campus</h4>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="name">Name:</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                placeholder="Enter name"
                type="text"
                value={this.state.inputName}
                name="name"
                onChange={this.handleNameChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="location">Location:</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                placeholder="Enter location"
                type="text"
                value={this.state.inputLocation}
                name="location"
                onChange={this.handleLocationChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="imageUrl">ImageUrl:</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                placeholder="Enter imageUrl"
                type="text"
                value={this.state.inputImageUrl}
                name="imageUrl"
                onChange={this.handleImageUrlChange} />
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
