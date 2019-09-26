import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Loading } from './Home/component';
import store from '../store';
import api from '../request/api';
import { getQueryString } from '../utils';
import { updateUserInfo } from '@/store/action';
import RedirectPage from './redirect';

const Home = React.lazy(() => import('./Home'));
// const Draw = React.lazy(() => import('./Draw'));
const Detail = React.lazy(() => import('./Detail'));
const Spread = React.lazy(() => import('./Spread'));
const Group = React.lazy(() => import('./Group'));
const Join = React.lazy(() => import('./Join'));
const Result = React.lazy(() => import('./result'));
const ProfitDetail = React.lazy(() => import('./ProfitDetail'));
const DiscountRecord = React.lazy(() => import('./DiscountRecord'));
const DiscountOperation = React.lazy(() => import('./DiscountOperation'));
const CumulativeInvitation = React.lazy(() => import('./CumulativeInvitation'));
const CumulativeOrder = React.lazy(() => import('./CumulativeOrder'));
const SharePageGsw = React.lazy(() => import('./SharePageGsw'));
const SharePageQzw = React.lazy(() => import('./SharePageQzw'));
const PromotionRules = React.lazy(() => import('./PromotionRules'));

const state = store.getState();

export interface State {}
class App extends React.Component<{}, State> {
  state = {
    userInfo: state.user,
    isShow: false
  };

  async componentDidMount() {
    let url = getQueryString('url');
    let code = getQueryString('code');
    let name = getQueryString('name');
    let signout = getQueryString('signout');
    if (signout) {
      await api.user.loginOut();
    } else if (url) {
      return;
    } else if (name) {
      await api.user
        .loginWithPhone({
          phone: '15884594704',
          code: '123654'
        })
        .then(({ data }) => {
          store.dispatch(updateUserInfo(data.resultData));
          this.getInviteCode();
        });
    } else if (code) {
      await api.user.wxUserLogin({ code }).then(({ data }) => {
        store.dispatch(updateUserInfo(data.resultData));
        this.getInviteCode();
      });
    }
    this.setState({
      isShow: true
    });
  }

  getInviteCode() {
    api.distributie.getInviteCode().then(({ data }) => {
      store.dispatch(
        updateUserInfo({
          inviteCode: data.resultData
        })
      );
    });
  }

  render() {
    let { isShow } = this.state;
    if (!isShow) {
      return <div></div>;
    }
    return (
      <Provider store={store}>
        <Router>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path="/" exact component={Home}></Route>
              <Route path="/redirect" exact component={RedirectPage}></Route>
              {/* <Route path="/draw" exact component={Draw}></Route> */}
              <Route path="/detail" exact component={Detail}></Route>
              <Route path="/spread" exact component={Spread}></Route>
              <Route path="/group" exact component={Group}></Route>
              <Route path="/join" exact component={Join}></Route>
              <Route
                path="/withdraw"
                exact
                component={DiscountOperation}
              ></Route>
              <Route path="/result" exact component={Result}></Route>
              <Route path="/profit" exact component={ProfitDetail}></Route>
              <Route
                path="/discountRecord"
                exact
                component={DiscountRecord}
              ></Route>
              <Route
                path="/sharePageGsw"
                exact
                component={SharePageGsw}
              ></Route>
              <Route
                path="/sharePageQzw"
                exact
                component={SharePageQzw}
              ></Route>
              <Route
                path="/cumulativeOrder"
                exact
                component={CumulativeOrder}
              ></Route>
              <Route
                path="/cumulativeInvitation/:id"
                exact
                component={CumulativeInvitation}
              ></Route>
              <Route
                path="/cumulativeOrder/:id"
                exact
                component={CumulativeOrder}
              ></Route>
              <Route
                path="/promotionRules"
                exact
                component={PromotionRules}
              ></Route>
              <Redirect to="/"></Redirect>
            </Switch>
          </Suspense>
        </Router>
      </Provider>
    );
  }
}

export default App;
