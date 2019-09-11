import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Loading } from './Home/component';
import store from '../store';
import api from '../request/api';
import { isWeiXin, getQueryString } from '../utils';
import { updateUserInfo } from '@/store/action';

const Home = React.lazy(() => import('./Home'));
const Detail = React.lazy(() => import('./Detail'));
const Spread = React.lazy(() => import('./Spread'));
const Group = React.lazy(() => import('./Group'));
const Join = React.lazy(() => import('./Join'));
const Result = React.lazy(() => import('./result'));
const ProfitDetail = React.lazy(() => import('./ProfitDetail'));
const DiscountRecord = React.lazy(() => import('./DiscountRecord'));
const DiscountOperation = React.lazy(() => import('./DiscountOperation'));
const DiscountResult = React.lazy(() => import('./DiscountResult'));
const CumulativeInvitation = React.lazy(() => import('./CumulativeInvitation'));
const CumulativeOrder = React.lazy(() => import('./CumulativeOrder'));

const state = store.getState();

export interface State {}

class App extends React.Component<{}, State> {
  state = {
    userInfo: state.user
  };
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    let code = getQueryString('code');
    let name = getQueryString('name');
    let signout = getQueryString('signout');

    if (signout) {
      api.user.loginOut();
    }
    if (code) {
      api.user.wxUserLogin({ code }).then(({ data }) => {
        store.dispatch(updateUserInfo(data.resultData));
      });
      return;
    } else if (name) {
      api.user
        .loginWithPhone({
          phone: '13699011543',
          code: '123654'
        })
        .then(({ data }) => {
          store.dispatch(updateUserInfo(data.resultData));
          this.setState({
            userInfo: data.resultData
          });
        });
      return;
    }
  }

  render() {
    let userInfo = this.state.userInfo;
    if (!userInfo.userId) {
      return <div></div>;
    }
    return (
      <Provider store={store}>
        <Router>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path="/" exact component={Home}></Route>
              <Route path="/detail" exact component={Detail}></Route>
              <Route path="/spread" exact component={Spread}></Route>
              <Route path="/group" exact component={Group}></Route>
              <Route path="/join" exact component={Join}></Route>
              <Route path="/result" exact component={Result}></Route>
              <Route path="/profit" exact component={ProfitDetail}></Route>
              <Route
                path="/discountRecord"
                exact
                component={DiscountRecord}
              ></Route>
            </Switch>
          </Suspense>
        </Router>
      </Provider>
    );
  }
}

export default App;
