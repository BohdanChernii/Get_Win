import React, {useEffect, useLayoutEffect, useState} from 'react';
import Main from "@/components/lyautes/Main/Main.jsx";
import {useSelector} from "react-redux";
import Success from "@/components/components/Success/Success.jsx";
import bgAside from "@img/bg-aside.svg";
import ru_RU from 'antd/lib/locale/ru_RU';
import {ConfigProvider} from "antd";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import CompanyRegistrationOther from "@/components/lyautes/CompanyRegistration/CompanyRegistrationOther.jsx";
import {messages} from "@assets/helpers/messages";
import {getSearchParams} from "@assets/helpers/helpers";
import AddVacancy from "@/components/lyautes/AddVacancy/AddVacancy.jsx";
import useAppReset from "@/hooks/useAppReset";
import useAppStart from "@/hooks/useAppStart";
import CompanyRegistrationMain from "@/components/lyautes/CompanyRegistration/CompanyRegistrationMain.jsx";
import AddDeputy from "@/components/lyautes/AddDeputy/AddDeputy.jsx";
import VerifyCompany from "@/components/lyautes/VerifyCompany/VerifyCompany.jsx";
import RecoveryPass from "@/components/lyautes/RecoveryPass/RecoveryPass.jsx";

function App() {
   const history = useHistory();
   const resetApp = useAppReset();
   const startApp = useAppStart();
   const {isReg} = useSelector(state => state.auth);
   const {error, isEmailVerify} = useSelector(state => state.resetPass);
   const {token} = useSelector(state => state.auth);
   const [userToken, setUserToken] = useState(null);
   
   const searchParams = getSearchParams();
   useLayoutEffect(() => {
      if (searchParams?.token) {
         localStorage.setItem('token', searchParams.token);
         setUserToken(searchParams.token);
         if (searchParams?.company_registration) {
            history.push('/company-registration-main');
         }
         if (searchParams.recovery_pass) {
            history.push('/recovery-pass');
         }
      }
   }, [searchParams]);
   
   useEffect(() => {
      if (userToken) {
         startApp()
      }
   }, [userToken])
   
   useEffect(() => {
      if (token) {
         startApp()
      }
   }, [token])
   
   useEffect(() => {
      const token = localStorage.getItem('token');
      token && setUserToken(token);
   }, [])
   
   if (!error && isEmailVerify) {
      return <Success title={messages.resetPasswdSuccess} img={bgAside} message={messages.goToHome}
                      successFn={resetApp}/>
   }
   
   if (isReg) {
      return <Success title={messages.registrationSuccess} img={bgAside} message={messages.goToHome}
                      successFn={resetApp}/>
   }
   
   return (
      <ConfigProvider locale={ru_RU}>
         
         <Switch>
            
            <Route exact path="/">
               <Main/>
            </Route>
            
            <Route exact path="/company">
               <CompanyRegistrationOther/>
            </Route>
            
            <Route exact path="/company-registration-main">
               <CompanyRegistrationMain/>
            </Route>
            <Route exact path="/company-verify">
               <VerifyCompany/>
            </Route>
            
            <Route exact path="/add-deputy">
               <AddDeputy/>
            </Route>
            
            <Route exact path="/add-vacancy">
               <AddVacancy/>
            </Route>
            
            <Route exact path="/recovery-pass">
               <RecoveryPass/>
            </Route>
            
            <Redirect from='*' to='/'/>
         </Switch>
      </ConfigProvider>
   );
}

export default App;

