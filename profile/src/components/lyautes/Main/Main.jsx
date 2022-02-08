import React, {useLayoutEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Layout} from "antd";
import Loading from "@/components/lyautes/Loading/Loading.jsx";
import AppHeader from "@/components/ui/AppHeader.jsx";
import AppContent from "@/components/ui/AppContent.jsx";
import AppMenu from "@/components/ui/AppMenu.jsx";
import CollapsedButton from "@/components/ui/CollapsedButton/CollapsedButton.jsx";
import UserAvatar from "@/components/ui/UserAvatar.jsx";
import Authentication from "@/components/lyautes/Authentication/Authentication.jsx";
import Success from "@/components/components/Success/Success.jsx";
import useAppReset from "@/hooks/useAppReset";
import {messages} from "@assets/helpers/messages";
import bgAside from "@img/bg-aside.svg";
import {useHistory} from "react-router-dom";

const {Sider} = Layout

function Main() {
   const history = useHistory();
   const resetApp = useAppReset()
   const [collapsed, setCollapsed] = useState(false);
   const [menuIdx, setMenuIdx] = useState('1');
   const {user, isDisabled} = useSelector(state => state.user);
   const token = localStorage.getItem('token');
   
   
   useLayoutEffect(() => {
      if (!isDisabled && (user && parseInt(user.step) < 4)) {
         if (parseInt(user.step) === 3) {
            history.push('/company-verify')
         } else {
            history.push('/company-registration-main')
         }
      }
   }, [user])
   
   if (user && !user.step && token) {
      return <Success title={messages.isNotConfirmUser} message={messages.goToHome} successFn={resetApp} img={bgAside}/>
   }
   
   if (!user && token) {
      return <Loading text='Проверка пользователя...'/>
   }
   
   if (!user && !token) {
      return <Authentication/>
   }
   
   return (
      <Layout className='mail_layout'>
         <Sider
            theme='light'
            style={{overflow: 'auto', height: '100vh',}}
            trigger={null}
            width={240}
            collapsedWidth={96}
            collapsible
            collapsed={collapsed}
            className='sider'>
            <UserAvatar isCollapsed={collapsed}/>
            <AppMenu isCollapsed={collapsed} menuIdx={menuIdx} setMenuIdx={setMenuIdx}/>
            <CollapsedButton onClick={() => setCollapsed(!collapsed)} isCollapsed={collapsed}/>
         </Sider>
         <Layout style={{backgroundColor: "#EDF2FF", padding: 24, overflow: "auto", height: '100vh'}}>
            <AppHeader/>
            <AppContent menuIdx={menuIdx} setMenuIdx={setMenuIdx}/>
         </Layout>
      </Layout>
   );
}

export default Main;