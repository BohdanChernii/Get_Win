import React from 'react';
import {Layout} from "antd";
import AuthenticationAside from "@/components/lyautes/Authentication/AuthenticationAside.jsx";
import bgAside from "@img/bg-aside.svg";
import FormResetPass from "@/components/form/FormResetPass/FormResetPass.jsx";
import {Content} from "antd/es/layout/layout";

function RecoveryPass() {
   
   const title = 'Восстановление пароля';
   const subTitle = 'Восстановите пароль чтобы начать использовать все преимущества платформы:'
   return (
      <Layout className='authentication'>
         <AuthenticationAside title={title} subTitle={subTitle} img={bgAside}/>
         <Layout className='authentication__content content'>
            <Content className='content__container'>
               <FormResetPass/>
            </Content>
         </Layout>
      </Layout>
   );
}

export default RecoveryPass;