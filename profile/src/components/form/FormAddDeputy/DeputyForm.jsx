import React, {useState} from 'react';
import AppText from "@/components/ui/AppText.jsx";
import {AutoComplete, Button, Col, Form, Input, Row} from "antd";
import InputMask from "react-input-mask";
import {password_generator} from "@assets/helpers/helpers";
import AppSelect from "@/components/ui/AppSelect.jsx";
import {useSelector} from "react-redux";
import {func, object, oneOf} from "prop-types";

DeputyForm.propTypes = {
   form: object,
   isSubmit: oneOf([true, false]).isRequired,
   onSubmit: func,
};

function DeputyForm({form, isSubmit, onSubmit}) {
   const {lists} = useSelector(state => ({
      lists: state.dropDownList.lists,
   }))
   
   const [newPassword, setNewPassword] = useState('');
   
   const onFinish = () => {
      onSubmit && onSubmit(form.getFieldsValue());
   }
   
   return (
      <Form
         name="add-deputy"
         layout='vertical'
         size='large'
         form={form}
         onFinish={onFinish}
      >
         <AppText text='Заместители' style={{
            color: '#20272E',
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 24,
            lineHeight: 1.5715,
            display: 'block'
         }}/>
         
         <Row gutter={[24, 0]}>
            <Col span={8}>
               <Form.Item
                  label='Фамилия Заместителя'
                  name='last_name'
                  rules={[{required: true, message: 'Введите Фамилию!'}]}>
                  <Input className='form__input' placeholder="Фамилия"/>
               </Form.Item>
            </Col>
            <Col span={8}>
               <Form.Item
                  label='Имя Заместителя'
                  name='first_name'
                  rules={[{required: true, message: 'Введите Имя!'}]}>
                  <Input className='form__input' placeholder="Имя"/>
               </Form.Item>
            </Col>
            <Col span={8}>
               <Form.Item label='Отчество Заместителя' name='middle_name'>
                  <Input className='form__input' placeholder="Отчество"/>
               </Form.Item>
            </Col>
         </Row>
         
         <Row gutter={[24, 0]}>
            <Col span={12}>
               <Form.Item
                  label='Телефон'
                  name='tel'
                  rules={[{required: true, message: 'Пожалуйста, введите номер телефона!'}]}>
                  <InputMask
                     mask="+380 99 99 99 999"
                     maskChar=" ">
                     {() => (<Input className='form__input' placeholder="+380"/>)}
                  </InputMask>
               </Form.Item>
            </Col>
            <Col span={12}>
               <Form.Item
                  label='E-Mail'
                  name='email'
                  rules={[
                     {type: 'email', message: "Не валидний адрес!"},
                     {required: true, message: 'Пожалуйста, введите адрес Email!'}
                  ]}>
                  <Input className='form__input' placeholder="new_email@gmail.com"/>
               </Form.Item>
            </Col>
         </Row>
         
         <Row gutter={[24, 0]}>
            <Col span={12}>
               <Form.Item
                  name="password"
                  label='Пароль'
                  rules={[{required: true, message: 'Пожалуйста, введите пароль!'},]}>
                  <AutoComplete
                     options={[{value: newPassword, option: '1',}]}
                     onFocus={() => newPassword || setNewPassword(password_generator())}
                     onSelect={(value) => form.setFields([
                        {name: 'password', value, errors: [], touched: true},
                        {name: 'confirm', value, errors: [], touched: true}]
                     )}>
                     <Input.Password className='form__input' placeholder="Укажите ваш пароль"/>
                  </AutoComplete>
               </Form.Item>
            </Col>
            <Col span={12}>
               <Form.Item
                  name="confirm" label='Подтвердите пароль'
                  rules={[{required: true, message: 'Пожалуйста, введите пароль!'},
                     ({getFieldValue}) => ({
                        validator(_, value) {
                           if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                           }
                           return Promise.reject(new Error('Пароли не совпадают!'));
                        },
                     })]}>
                  <Input.Password className='form__input' placeholder="Укажите ваш пароль"/>
               </Form.Item>
            </Col>
         </Row>
         <Form.Item name="s_access_z" label="Права доступа Заместителя">
            <AppSelect options={lists?.s_access_z} placeholder="Права доступа" mode='multiple'/>
         </Form.Item>
         {isSubmit && (
            <Row justify='end'>
               <Col>
                  <Button type="primary" shape="round" htmlType="submit">
                     Сохранить и продолжить
                  </Button>
               </Col>
            </Row>
         )}
      </Form>
   );
}

export default DeputyForm;