import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Home = React.lazy(() => import('./Home'));
const ProfitDetail = React.lazy(() => import('./ProfitDetail'));
const DiscountRecord = React.lazy(() => import('./DiscountRecord'));
const DiscountOperation = React.lazy(() => import('./DiscountOperation'));
const DiscountResult = React.lazy(() => import('./DiscountResult'));
const CumulativeInvitation = React.lazy(() => import('./CumulativeInvitation'));
const CumulativeOrder = React.lazy(() => import('./CumulativeOrder'));

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
          <Route
            path="/discountOperation"
            exact
            component={DiscountOperation}
          ></Route>
          <Route
            path="/discountResult"
            exact
            component={DiscountResult}
          ></Route>
          <Route
            path="/cumulativeInvitation"
            exact
            component={CumulativeInvitation}
          ></Route>
          <Route
            path="/cumulativeOrder"
            exact
            component={CumulativeOrder}
          ></Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default home;
