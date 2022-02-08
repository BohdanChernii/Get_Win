import React, {useState} from 'react';
import {Layout} from 'antd';
import AuthenticationAside from "@/components/lyautes/Authentication/AuthenticationAside.jsx";
import TabsAuthContent from "@/components/tabs/TabsAuthContent/TabsAuthContent.jsx";
import bgAside from '@img/bg-aside.svg'
import FormForgotPassword from "@/components/form/FormForgotPassword/FormForgotPassword.jsx";

const {Content} = Layout;

function Authentication() {
   const [tabIndex, setTabIndex] = useState('1');
   const [isForgotPassword, setIsForgotPassword] = useState(false);
   // const [token, setToken] = useState('');
   // const searchParams = getSearchParams();
   
   let title, subTitle;
   //
   // useLayoutEffect(() => {
   //    if (searchParams.token && searchParams.recovery_pass) {
   //       setIsResetPass(true)
   //       setToken(searchParams.token)
   //    }
   // }, [searchParams]);
   
   
   if (tabIndex === '1') {
      title = 'Войти в аккаунт';
      subTitle = 'Введите ваш E-mail и пароль, чтобы начать использовать все преимущества платформы:'
   } else {
      title = 'Регистрация аккаунта';
      subTitle = 'Зарегистрируйте новый аккаунт, чтобы начать использовать все преимущества платформы:'
   }
   if (isForgotPassword) {
      title = 'Восстановление пароля';
      subTitle = 'Введите ваш E-mail, чтобы сбросить пароль и начать использовать все преимущества платформы:'
   }
   
   return (
      <Layout className='authentication'>
         <AuthenticationAside title={title} subTitle={subTitle} img={bgAside}/>
         
         <Layout className='authentication__content content'>
            <Content className='content__container'>
               {isForgotPassword
                  ? <FormForgotPassword/>
                  : <TabsAuthContent tabIndex={tabIndex} setIsForgotPassword={setIsForgotPassword} setTabIndex={setTabIndex}/>
               }
            </Content>
         </Layout>
      </Layout>);
}

export default Authentication;