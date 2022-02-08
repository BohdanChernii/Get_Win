import React, {useLayoutEffect} from 'react';
import {Layout} from "antd";
import AuthenticationAside from "@/components/lyautes/Authentication/AuthenticationAside.jsx";
import bgAside from "@img/bg-aside.svg";
import {Content} from "antd/es/layout/layout";
import FormVerifyCompany from "@/components/form/FormVerifyCompany/FormVerifyCompany.jsx";
import {useSelector} from "react-redux";
import Loading from "@/components/lyautes/Loading/Loading.jsx";
import useAppReset from "@/hooks/useAppReset";

function VerifyCompany() {
   const {user, loading, error} = useSelector(state => state.user);
   const resetApp = useAppReset();
   
   useLayoutEffect(() => {
      if (error) {
         resetApp();
      }
   }, [error]);
   
   if (loading && !user) return <Loading text='Проверка пользователя...'/>
   
   return (
      <Layout className='new-company'>
         <AuthenticationAside
            title={'Продолжение регистрации'}
            subTitle={'Верифицируйте данные компании, чтобы получить полноценный доступ к платформе:'}
            img={bgAside}/>
         
         <Layout className='new-company__layout layout'>
            <Content className='new-company__container'>
               <FormVerifyCompany/>
            </Content>
         </Layout>
      </Layout>
   );
}

export default VerifyCompany;