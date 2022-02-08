import React, {useEffect, useState} from 'react';
import {AutoComplete, Button, Form, Input} from "antd";
import LoginOptions from "@/components/components/LoginOptions/LoginOptions.jsx";
import {checkFieldsValues, checkPasswordsFields, password_generator} from "@assets/helpers/helpers";
import {useDispatch, useSelector} from "react-redux";
import {registration} from "@store/actions/auth-actions";

function Registration() {
   const [form] = Form.useForm();
   const [fields, setFields] = useState(form.getFieldsValue());
   const [newPassword, setNewPassword] = useState('');
   const [loading, setLoading] = useState(false);
   const isReady = checkFieldsValues(fields);
   
   const dispatch = useDispatch();
   const {error} = useSelector(state => state.auth);
   
   const onFinish = async (values) => {
      await dispatch(registration(values));
   };
   
   useEffect(() => {
      if (error === "Этот пользователь уже существует") {
         setLoading(false)
         form.setFields([
            {
               name: 'email',
               errors: [`${error}`],
            }
         ])
      }
      setLoading(false)
      
   }, [error]);
   
   const updatePasswords = value => {
      setTimeout(() => {
         const fields = {
            confirm: value,
            password: value,
         };
         const email = form.getFieldValue('email');
         email ? fields.email = email : null
         
         form.setFieldsValue({...fields})
      }, 0)
      setFields(prev => {
         return prev.map(item => {
            if (item.name.includes('confirm') || item.name.includes('password')) {
               item.errors = [];
               item.value = value;
            }
            return item
         })
      })
   }
   return (
      <>
         <Form
            name="registration"
            layout='vertical'
            size='large'
            form={form}
            hideRequiredMark={true}
            onFinish={onFinish}
            onFieldsChange={(_, allFields) => {
               setFields(checkPasswordsFields(allFields));
            }}
            fields={fields}
            style={{maxWidth: 336}}
            className='form'
         >
            <Form.Item
               label='Введите E-Mail'
               name='email'
               rules={[
                  {type: 'email', message: "Не валидний адрес!"},
                  {required: true, message: 'Пожалуйста, введите адрес Email!'}
               ]}>
               <Input className='form__input' placeholder="yourmail@mail.com"/>
            </Form.Item>
            
            <Form.Item
               name="password"
               label='Придумайте пароль'
               rules={[
                  {required: true, message: 'Пожалуйста, введите пароль!',},
               ]}>
               <AutoComplete
                  options={[{
                     value: newPassword,
                     option: '1',
                  }]}
                  onFocus={() => newPassword || setNewPassword(password_generator())}
                  onSelect={(value) => updatePasswords(value)}
               >
                  <Input.Password className='form__input' placeholder="Укажите ваш пароль"/>
               </AutoComplete>
            </Form.Item>
            
            <Form.Item
               name="confirm"
               label='Повторите пароль'
               rules={[{required: true, message: 'Пожалуйста, введите пароль!'}]}>
               <Input.Password className='form__input' placeholder="Повторите ваш пароль"/>
            </Form.Item>
            
            <Form.Item>
               <Button block shape='round' type="primary" htmlType="submit" disabled={isReady} loading={loading}>
                  Зарегистрировать аккаунт
               </Button>
            </Form.Item>
         </Form>
         <LoginOptions/>
      </>
   );
}

export default Registration;