import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Content from '@/components/content/Content.jsx';
import BackgroundWelcome from '@/components/feature/backgroundWelcome/BackgroundWelcome.jsx';
import HomePage from '@/components/pages/login_registration/HomePage.jsx';
import LoginPage from '@/components/pages/login_registration/LoginPage.jsx';
import LoginEmailPage from '@/components/pages/login_registration/LoginEmailPage.jsx';
import ForgotPasswordPage from '@/components/pages/login_registration/ForgotPasswordPage.jsx';
import LoginPhonePage from '@/components/pages/login_registration/LoginPhonePage.jsx';
import RegistrationPage from '@/components/pages/login_registration/RegistrationPage.jsx';
import permission from '@/store/permission';
import { observer } from 'mobx-react-lite';
import userStore from '@/store/user-store';
import eventStore from '@store/event-store';
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';
import spravStore from '@store/sprav-store';
import foodBasketStore from '@store/food-basket-store';
import exceptionGroupStore from '@store/exception-group-store';
import analysesStore from '@store/analyses-store';
import { getAllCookies } from '@scripts/functions';

console.clear();

function App() {
  const history = createBrowserHistory();
  // const clearHistory = () => {
  //
  // }
  //
  // const location = useLocation()
  // (history)
  useEffect(() => {
    const cookies = getAllCookies();
    if (cookies.token) {
      userStore.setUserByToken(cookies.token).then((res) => {
        if (res.ok) {
          exceptionGroupStore.fetchGroups();
          spravStore.fetchSprav();
          foodBasketStore.fetchProduct();
          analysesStore.fetchAnalyses();
          // calcStore.fetchCalc()
          eventStore.fetchEventsData();
        }
      });
      permission.changePermission();
    } else {
      history.push('/');
    }
    //  window.addEventListener('beforeunload', () => {
    //     history.push('/')
    //  })
    // return ()=>{
    //    window.removeEventListener('beforeunload', clearHistory)
    // }
  }, []);

  // useEffect(() => {
  //    console.log(location)
  // }, [location])
  //
  //
  // useEffect(() => {
  //    // fetch(productsDenyGet)
  //    // fetch('https://vn.mh.net.ua/public/api/calc_get/?token=eccbc87e4b5ce2fe28308fd9f2a7baf3')
  //    fetch(`${exceptionGroupGet}?token=${userStore.token}`)
  //       .then(res => res.json())
  //       .then(data => {
  //          console.log(data)
  //       })
  // }, []);
  useEffect(() => {
    // exceptionGroupStore.fetchGroups()
    // spravStore.fetchSprav();
    // eventStore.fetchEventsData();
    // foodBasketStore.fetchProduct();
  }, []);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      {!permission.permission ? (
        <BackgroundWelcome>
          <Switch>
            {/*{!permission.permission && <Redirect exact from="*" to='/'/>}*/}
            <Route exact path="/" component={HomePage} />
            <Route exact path="/linkedin" component={LinkedInPopUp} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/login-email" component={LoginEmailPage} />
            <Route exact path="/login-phone" component={LoginPhonePage} />
            <Route
              exact
              path="/forgot-password"
              component={ForgotPasswordPage}
            />
            <Route exact path="/registration" component={RegistrationPage} />
          </Switch>
        </BackgroundWelcome>
      ) : (
        <Content />
      )}
    </Router>
  );
}

export default observer(App);
