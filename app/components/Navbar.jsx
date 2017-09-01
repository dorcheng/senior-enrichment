import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar () {
  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <Link to={'/'} className="navbar-brand" >The Academy</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={'/campuses'} className="nav-link">Campuses</Link>
            </li>
            <li className="nav-item">
              <Link to={'/students'} className="nav-link">Students</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
