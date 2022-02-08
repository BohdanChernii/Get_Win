import React, {useEffect, useState} from 'react';
import {Button, Form, Input} from 'antd';
import LoginOptions from "@/components/components/LoginOptions/LoginOptions.jsx";
import {checkFieldsValues} from "@assets/helpers/helpers";
import {useDispatch, useSelector} from "react-redux";
import {login} from "@store/actions/auth-actions";

function Login({setIsForgotPassword}) {
   const [form] = Form.useForm();
   const [fields, setFields] = useState(form.getFieldsValue());
   const [loading, setLoading] = useState(false);
   const isReady = checkFieldsValues(fields);
   
   const dispatch = useDispatch();
   const auth = useSelector(state => state.auth)
   
   useEffect(() => {
      
      if (auth.error && (auth.error !== 'Этот пользователь уже существует')) {
         setLoading(false)
         form.setFields([
            {
               name: 'password',
               errors: [`${auth.error}`],
            }
         ])
      }
      setLoading(false)
      
   }, [auth]);
   
   const onFinish = async (values) => {
      setLoading(true)
      await dispatch(login(values));
   };
   
   return (
      <>
         <Form
            name="login"
            layout='vertical'
            size='large'
            initialValues={{
               email: '',
               password: '',
            }}
            onFinish={onFinish}
            onFieldsChange={(_, allFields) => {
               setFields(allFields);
            }}
            form={form}
            hideRequiredMark={true}
            style={{maxWidth: 336}}
            className='form'
         >
            <Form.Item
               className='form__container'
               name='email'
               label='Введите E-Mail'
               rules={[
                  {type: 'email', message: "Не валидний адрес!"},
                  {required: true, message: 'Пожалуйста, введите адрес Email!'}
               ]}>
               <Input className='form__input' placeholder="yourmail@mail.com"/>
            </Form.Item>
            
            <Form.Item className='form__container'>
               <Form.Item
                  name="password"
                  label='Введите пароль'
                  rules={[{required: true, message: 'Пожалуйста, введите пароль!'}]}>
                  <Input.Password className='form__input' placeholder="Укажите ваш пароль"/>
               </Form.Item>
               <span className='form__link _forgot' onClick={() => setIsForgotPassword(true)}>Забыли пароль?</span>
            </Form.Item>
            
            <Form.Item>
               <Button block type="primary" shape='round' htmlType="submit" disabled={isReady} loading={loading}>
                  Войти в аккаунт
               </Button>
            </Form.Item>
         </Form>
         <LoginOptions/>
      </>
   );
}

export default Login;