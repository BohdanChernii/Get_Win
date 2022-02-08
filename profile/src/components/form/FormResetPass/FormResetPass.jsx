import React, {useState} from 'react';
import {AutoComplete, Button, Form, Input, message} from "antd";
import {checkFieldsValues, checkPasswordsFields, password_generator} from "@assets/helpers/helpers";
import {useDispatch} from "react-redux";
import {resetPassword} from "@store/actions/reset-pass-actions";
import useAppReset from "@/hooks/useAppReset";


function FormResetPass() {
   const dispatch = useDispatch();
   const addReset = useAppReset();
   const [form] = Form.useForm();
   
   const [isDisabled, setIsDisabled] = useState(true);
   const [newPassword, setNewPassword] = useState('');
   
   const onFinish = async values => {
      const token = localStorage.getItem('token');
      if (token && values.password) {
         if (token) {
            await dispatch(resetPassword(token, values.password));
            message.success({content: 'Вы успешно сменили пароль!', duration: 5});
            addReset()
         }
      }
   }
   
   const onSelectHandler = value => {
      form.setFields([
         {
            name: 'password',
            errors: [],
            value,
         },
         {
            name: 'confirm',
            errors: [],
            value,
         }
      ])
      setIsDisabled(false)
   }
   return (
      <Form
         name="forgot"
         layout='vertical'
         size='large'
         initialValues={{
            password: '',
            confirm: ''
         }}
         onFinish={onFinish}
         onFieldsChange={(_, allFields) => {
            form.setFields(checkPasswordsFields(allFields))
            setIsDisabled(checkFieldsValues(allFields));
         }}
         form={form}
         hideRequiredMark={true}
         style={{maxWidth: 336, paddingTop: 110}}
         className='form'
      >
         <Form.Item
            className='form__container'
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
               onSelect={onSelectHandler}>
               <Input.Password className='form__input' placeholder="Укажите ваш пароль"/>
            </AutoComplete>
         </Form.Item>
         
         <Form.Item
            className='form__container'
            name="confirm"
            label='Повторите пароль'
            rules={[{required: true, message: 'Пожалуйста, введите пароль!'}]}>
            <Input.Password className='form__input' placeholder="Укажите ваш пароль"/>
         </Form.Item>
         
         <Form.Item>
            <Button style={{width: '100%'}} type="primary" htmlType="submit" disabled={isDisabled}>
               Восстановить пароль
            </Button>
         </Form.Item>
      </Form>
   );
}

export default FormResetPass;