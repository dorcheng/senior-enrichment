import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from './Navbar';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import AddCampusForm from './AddCampusForm';
import AddStudentForm from './AddStudentForm';
import Home from './Home';

export default function App () {
  return (
      <div id="app" className="container-fluid">
        <Navbar />
        <div>
          <Switch>
            <Route exact path="/campuses/add-campus" component={AddCampusForm} />
            <Route exact path="/students/add-student" component={AddStudentForm} />
            <Route exact path="/campuses/:campusId" component={SingleCampus} />
            <Route exact path="/students/:studentId" component={SingleStudent} />
            <Route exact path="/campuses" component={AllCampuses} />
            <Route exact path="/students" component={AllStudents} />
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </div>
  );
}
