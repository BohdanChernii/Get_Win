import React, {useEffect, useLayoutEffect, useState} from 'react';
import {func, number} from 'prop-types';
import {useSelector} from "react-redux";
import {AutoComplete, Button, Checkbox, Form, Input, message, Select} from "antd";
import {password_generator} from "@assets/helpers/helpers";
import InputMask from "react-input-mask";
import AppText from "@/components/ui/AppText.jsx";
import DropDownArrow from "@/components/icons/drop_down_arrow/dropDownArrow.jsx";
import Text from "antd/es/typography/Text";
import {setCompanyAdmin, setUserStep} from "@assets/helpers/asyncHelpers";
import useAppReset from "@/hooks/useAppReset";

FormSetAdmin.propTypes = {
   changeStep: func,
   step: number,
};

function FormSetAdmin({changeStep, step, setIsSuccess}) {
   const {user: {email}, error} = useSelector(state => state.user);
   
   const resetApp = useAppReset()
   
   const [isAdmin, setIsAdmin] = useState(true);
   const [isLoading, setIsLoading] = useState(false);
   const [newPassword, setNewPassword] = useState('');
   
   const [form] = Form.useForm();
   const key = 'set-admin'
   const onFinish = async () => {
      message.loading({content: 'Загрузка...', key});
      setIsLoading(true)
      
      try {
         const json = await setCompanyAdmin(form.getFieldsValue());
         if (json.ok) {
            message.success({content: 'Данные об Администраторе успешно сохранены!', key, duration: 4});
            await setUserStep(step + 1);
            setIsLoading(false)
            setIsSuccess()
            
         } else {
            setIsLoading(false)
            message.error({content: json.message, key, duration: 4});
         }
      } catch (error) {
         setIsLoading(false)
         message.error({content: error, key, duration: 4});
      }
   }
   useEffect(() => {
      if (isAdmin) {
         setIsAdmin(true)
         form.resetFields();
         form.setFields([
            {name: 'email', value: email},
         ])
      } else {
         setIsAdmin(false)
         const valueAdmin = form.getFieldValue('is_admin');
         form.resetFields();
         form.setFields([
            {name: 'is_admin', value: valueAdmin},
         ])
      }
   }, [isAdmin]);
   useLayoutEffect(() => {
      if (error) {
         resetApp()
      }
      
   }, [error]);
   
   const handleOnChangeAdmin = () => {
      const valueAdmin = form.getFieldValue('is_admin');
      valueAdmin === '0' ? setIsAdmin(true) : setIsAdmin(false)
   }
   
   return (
      <Form
         name="set-company-admin"
         initialValues={{
            is_admin: '0',    // Передача прав Администратора
                              // 0 - Назначить меня администратором Компании
                              // 1 - Назначить другого человека администратором Компании
            first_name: '',   // імя
            surname: '',      // фамилия
            middle_name: '',  // отчество
            tel: '',          // Телефон*
            email: '',        // E-mail*
            password: '',     // Пароль*
            confirm: '',      // Подтвердите пароль*
            agreement: true   // Я принимаю Политику конфиденциальности и Условия пользования
         }}
         layout='vertical'
         size='large'
         onFinish={onFinish}
         form={form}
         className='form'
      >
         <AppText text='Администратор'
                  style={{
                     color: '#20272E',
                     fontSize: 18,
                     fontWeight: 700,
                     marginBottom: 24,
                     lineHeight: 1.5715,
                     display: 'block'
                  }}/>
         
         <Form.Item name="is_admin" label="Передача прав Администратора" className='form__container'
                    rules={[{required: true, message: 'Пожалуйста, введите Адміністатора!'}]}>
            <Select listHeight={300} placeholder="Количество сотрудников" suffixIcon={<DropDownArrow/>}
                    onChange={handleOnChangeAdmin}>
               <Select.Option value='0' style={{borderBottom: '1px solid #D9DCF0'}}>
                  <Text className='form__select_title'>Назначить меня администратором Компании</Text>
                  <Text className='form__select_disabled'>
                     Вы сможете самостоятельно верифицировать компанию, добавлять и редактировать информацию, открывать
                     и
                     закрывать вакансии и добавлять кандидатов.</Text>
               </Select.Option>
               <Select.Option value='1'>
                  <Text className='form__select_title'>Назначить другого человека администратором Компании</Text>
                  <Text className='form__select_disabled'>
                     Вы будете добавлены в Компанию как обычный сотрудник. Ваши полномочия и права доступа сможет
                     определить указанный Администратор.
                     Указанный Администратор получит на почту уведомление о назначении.</Text>
               </Select.Option>
            </Select>
         </Form.Item>
         <div className='form__row'>
            
            <Form.Item
               className='form__container'
               label='Фамилия'
               name='surname'
               rules={[{required: true, message: 'Пожалуйста, введите Фамилию!'}]}>
               <Input className='form__input' placeholder="Фамилия"/>
            </Form.Item>
            
            <Form.Item
               className='form__container'
               label='Имя'
               name='first_name'
               rules={[{required: true, message: 'Пожалуйста, введите Имя!'}]}>
               <Input className='form__input' placeholder="Имя"/>
            </Form.Item>
            
            <Form.Item
               className='form__container'
               label='Отчество'
               name='middle_name'>
               <Input className='form__input' placeholder="Отчество"/>
            </Form.Item>
         
         </div>
         <div className='form__row'>
            <Form.Item
               className='form__container'
               label='Телефон'
               name='tel'
               rules={[{required: true, message: 'Пожалуйста, введите номер телефона!'}]}>
               <InputMask placeholder="+380"
                          className='ant-input ant-input-lg form__input'
                          mask="+380 99 99 99 999"
                          maskChar=" "/>
            </Form.Item>
            
            <Form.Item
               className='form__container'
               label='E-Mail'
               name='email'
               rules={[
                  {type: 'email', message: "Не валидний адрес!"},
                  {required: !isAdmin, message: 'Пожалуйста, введите адрес Email!'}
               ]}>
               <Input disabled={isAdmin} className='form__input' placeholder="new_email@gmail.com"/>
            </Form.Item>
         </div>
         
         <div className='form__row'>
            <Form.Item
               className='form__container'
               name="password"
               label='Пароль'
               rules={[{required: !isAdmin, message: 'Пожалуйста, введите пароль!'},]}>
               <AutoComplete
                  disabled={isAdmin}
                  options={[{value: newPassword, option: '1',}]}
                  onFocus={() => newPassword || setNewPassword(password_generator())}
                  onSelect={(value) => form.setFields([
                     {name: 'password', value, errors: [], touched: true},
                     {name: 'confirm', value, errors: [], touched: true}]
                  )}>
                  <Input.Password disabled={isAdmin} className='form__input' placeholder="Укажите ваш пароль"/>
               </AutoComplete>
            </Form.Item>
            
            <Form.Item
               className='form__container' name="confirm" label='Подтвердите пароль'
               rules={[{required: !isAdmin, message: 'Пожалуйста, введите пароль!'},
                  ({getFieldValue}) => ({
                     validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                           return Promise.resolve();
                        }
                        return Promise.reject(new Error('Пароли не совпадают!'));
                     },
                  })]}>
               <Input.Password disabled={isAdmin} className='form__input' placeholder="Укажите ваш пароль"/>
            </Form.Item>
         </div>
         
         <Form.Item
            className='form__container'
            name="agreement"
            valuePropName="checked"
            rules={[
               {
                  validator: (_, value) =>
                     value ? Promise.resolve() : Promise.reject(new Error('Следует принять соглашение!')),
               }]}>
            <Checkbox className='form__input-checkbox '>
               <span className='_required '>Я принимаю <span
                  className='link _bold'>Политику конфиденциальности</span> и <span
                  className='link _bold'>Условия пользования</span>
               </span>
            </Checkbox>
         
         </Form.Item>
         
         <Form.Item className='form__container'>
            <div className='form__row _between'>
               <Button disabled={isLoading} type="default" htmlType="button" onClick={() => changeStep(step - 1)}>
                  Назад
               </Button>
               <Button type="primary" shape='round' htmlType="submit" disabled={isLoading}>
                  Сохранить и продолжить
               </Button>
            </div>
         </Form.Item>
      </Form>
   );
}

export default FormSetAdmin;