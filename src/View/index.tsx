import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';

const home: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home.view}></Route>
      </Switch>
    </Router>
  );
};

export default home;
