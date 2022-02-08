import React, {useEffect} from 'react';
import {Tabs} from "antd";
import Login from "@/components/pages/Login/Login.jsx";
import Registration from "@/components/pages/Registration/Registration.jsx";
import {func, string} from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {clearInfoResetPass} from "@store/actions/reset-pass-actions";

const {TabPane} = Tabs;
TabsAuthContent.propTypes = {
   tabIndex: string, setTabIndex: func, setIsForgotPassword: func,
};

function TabsAuthContent({tabIndex, setTabIndex, setIsForgotPassword}) {
   const dispatch = useDispatch()
   const {isResetPass} = useSelector(state => state.resetPass);
   
   useEffect(() => {
      const index = setTimeout(() => {
         isResetPass && dispatch(clearInfoResetPass())
      }, 3000)
      return () => {
         clearTimeout(index)
      }
   }, [isResetPass])
   
   return (
      <>
         <Tabs onChange={setTabIndex} defaultActiveKey={tabIndex.toString()} centered style={{width: '100%'}}>
            <TabPane tab="Вход" key="1">
               <Login setIsForgotPassword={setIsForgotPassword}/>
            </TabPane>
            <TabPane tab="Регистрация" key="2">
               <Registration/>
            </TabPane>
         </Tabs>
      </>
   
   );
}

export default TabsAuthContent;