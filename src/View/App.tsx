import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Home = React.lazy(() => import('./Home'));
const Spread = React.lazy(() => import('./Spread'));
const Group = React.lazy(() => import('./Group'));
const Join = React.lazy(() => import('./Join'));
const ProfitDetail = React.lazy(() => import('./ProfitDetail'));
const DiscountRecord = React.lazy(() => import('./DiscountRecord'));
const DiscountOperation = React.lazy(() => import('./DiscountOperation'));
const DiscountResult = React.lazy(() => import('./DiscountResult'));
const CumulativeInvitation = React.lazy(() => import('./CumulativeInvitation'));
const CumulativeOrder = React.lazy(() => import('./CumulativeOrder'));

export interface State {}

class App extends React.Component<{}, State> {
  render() {
    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/spread" exact component={Spread}></Route>
            <Route path="/group" exact component={Group}></Route>
            <Route path="/join" exact component={Join}></Route>
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
  }
}

export default App;
