import React, {useEffect, useLayoutEffect, useState} from 'react';
import AuthenticationAside from "@/components/lyautes/Authentication/AuthenticationAside.jsx";
import bgAside from "@img/bg-aside.svg";
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import FormSetCompanyMain from "@/components/form/FormSetCompany/FormSetCompanyMain.jsx";
import FormSetAdmin from "@/components/form/FormSetAdmin/FormSetAdmin.jsx";
import {useDispatch, useSelector} from "react-redux";
import DynamicSteps from "@/components/components/DynamicSteps/DynamicSteps.jsx";
import {useHistory} from "react-router-dom";
import Loading from "@/components/lyautes/Loading/Loading.jsx";
import Success from "@/components/components/Success/Success.jsx";
import {messages} from "@assets/helpers/messages";
import {getUser} from "@store/actions/user-actions";
import useAppReset from "@/hooks/useAppReset";

function CompanyRegistrationMain() {
   const dispatch = useDispatch();
   const {user, error} = useSelector(state => state.user);
   const userToken = localStorage.getItem('token');
   const [current, setCurrent] = useState(1);
   // const startApp = useAppStart();
   const resetApp = useAppReset();
   const history = useHistory();
   let title, subTitle
   
   if (current === 1) {
      title = 'Регистрация Компании'
      subTitle = 'Заполните информацию о своей Компании, чтобы начать использовать все преимущества платформы:';
   } else if (current === 2) {
      title = 'Регистрация Администратора'
      subTitle = 'Заполните информацию о себе, чтобы начать использовать все преимущества платформы:';
   } else if (current === 3) {
      title = 'Продолжение регистрации'
      subTitle = 'Верифицируйте данные компании, чтобы получить полноценный доступ к платформе:';
   }
   
   const [isSuccess, setIsSuccess] = useState(false);
   
   
   const steps = [
      {
         id: 1,
         content: <FormSetCompanyMain changeStep={setCurrent} step={current}/>,
      },
      {
         id: 2,
         content: <FormSetAdmin changeStep={setCurrent} step={current} setIsSuccess={() => setIsSuccess(!isSuccess)}/>,
      },
   ];
   
   const goToVerification = async () => {
      await dispatch(getUser())
      history.push('company-verify')
   }
   
   useEffect(() => {
      // if (userToken && !user) {
      //    startApp()
      // }
      if (user) {
         setCurrent(Number(user.step))
      }
      
      if (parseInt(user?.step) >= 4) {
         history.push('/')
      }
      
   }, [userToken, user]);
   useLayoutEffect(() => {
      if (error) {
         resetApp()
      }
      
   }, [error]);
   
   
   if (!user && userToken) {
      return <Loading text='Проверка пользователя...'/>
   }
   
   if (isSuccess) {
      return <Success
         title='Новая Компания успешно создана и добавлена в базу. Завершите Регистрацию Компании пройдя верификацию.'
         img={bgAside} message={messages.goToVerify}
         successFn={goToVerification}/>
   }
   return (
      <Layout className='new-company'>
         <AuthenticationAside title={title} subTitle={subTitle} img={bgAside}/>
         
         <Layout className='new-company__layout layout'>
            <Content className='new-company__container'>
               <DynamicSteps steps={steps} currentStep={current}/>
            </Content>
         </Layout>
      </Layout>
   );
}

export default CompanyRegistrationMain;