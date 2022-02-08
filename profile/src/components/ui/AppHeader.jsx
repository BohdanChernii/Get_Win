import React, {useState} from 'react';
import {Header} from "antd/es/layout/layout";
import {Space} from "antd";
import AppSearchInput from "@/components/ui/AppSearсhInput.jsx";
import AppMessage from "@/components/ui/AppMessage.jsx";
import logo from "@img/logo.svg";
import message from "@img/icons/message.svg";
import bell from "@img/icons/bell.svg";
import useAppReset from "@/hooks/useAppReset";

function AppHeader() {
   const resetApp = useAppReset();
   const [value, setValue] = useState('');
   return (
      <Header className='header'>
         <div className="header__container">
            <AppSearchInput value={value} changeValue={setValue} placeholder='Найти на странице'/>
            <Space direction='horizontal' size={40}>
               <Space direction='horizontal' size={24}>
                  <AppMessage img={bell}/>
                  <AppMessage img={message}/>
               </Space>
               <img className='header__logo' src={logo} alt='logo' onClick={resetApp}/>
            </Space>
         </div>
      </Header>
   );
}

export default AppHeader;