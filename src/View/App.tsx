import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Home = React.lazy(() => import('./Home'));
const ProfitDetail = React.lazy(() => import('./ProfitDetail'));
const DiscountRecord = React.lazy(() => import('./DiscountRecord'));

const home: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/profit" exact component={ProfitDetail}></Route>
          <Route
            path="/discountRecord"
            exact
            component={DiscountRecord}
          ></Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default home;
