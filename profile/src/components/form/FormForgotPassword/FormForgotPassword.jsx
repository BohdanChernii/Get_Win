import React, {useEffect, useState} from 'react';
import {Button, Form, Input} from "antd";
import {checkFieldsValues} from "@assets/helpers/helpers";
import {useDispatch, useSelector} from "react-redux";
import {emailVerify} from "@store/actions/reset-pass-actions";

function FormForgotPassword() {
   const [form] = Form.useForm();
   const [isDisabled, setIsDisabled] = useState(true);
   
   const dispatch = useDispatch();
   const {error, isEmailVerify} = useSelector(state => state.resetPass);
   
   useEffect(() => {
      if (error && !isEmailVerify) {
         form.setFields([{
            name: 'email',
            errors: [`${error}`]
         }])
      }
   }, [error, isEmailVerify]);
   
   const onFinish = async values => await dispatch(emailVerify(values.email));
   return (
      <Form
         name="forgot"
         layout='vertical'
         size='large'
         initialValues={{
            email: '',
         }}
         onFinish={onFinish}
         onFieldsChange={(_, allFields) => {
            setIsDisabled(checkFieldsValues(allFields));
         }}
         form={form}
         hideRequiredMark={true}
         style={{maxWidth: 336, paddingTop: 110}}
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
         
         <Form.Item>
            <Button block shape='round' type="primary" htmlType="submit" disabled={isDisabled}>
               Восстановить пароль
            </Button>
         </Form.Item>
      </Form>
   );
}

export default FormForgotPassword;