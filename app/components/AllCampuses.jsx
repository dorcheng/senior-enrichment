import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store, { fetchCampuses, deleteSelectedCampus } from '../store';

export default class AllCampuses extends Component {
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

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleDelete (event) {
    const campusId = event.target.id;
    const deleteSelectedCampusThunk = deleteSelectedCampus(campusId);
    store.dispatch(deleteSelectedCampusThunk);
  }

  render () {
    const campuses = this.state.campuses;

    return (
      <div className="row">
        <div className="col-lg-4" />
        <div className="col-lg-5">
          <table className="table table-hover">
            <thead>
              <tr>
                <th />
                <th><h4>Name</h4></th>
                <th><h4>Location</h4></th>
              </tr>
            </thead>
            <tbody>
              {campuses.map(campus => {
                return (
                  <tr key={campus.id}>
                    <td><img src={ campus.imageUrl } /></td>
                    <td><Link to={`/campuses/${campus.id}`}>{ campus.name }</Link>
                    </td>
                    <td>{ campus.location }</td>
                    <td><button
                          id={campus.id}
                          type="button"
                          className="btn btn-danger"
                          onClick={this.handleDelete}>
                          Remove
                        </button>
                    </td>
                  </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
        <div className="col-lg-3">
          <Link to={'/campuses/add-campus'}>
            <button
              type="button"
              className="btn btn-info create">
              + ADD NEW CAMPUS
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
