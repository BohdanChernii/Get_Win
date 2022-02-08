import React, {useState} from 'react';
import {func, number} from 'prop-types';
import {Button, Form, Input, message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import AppText from "@/components/ui/AppText.jsx";
import {createCompany, setUserStep} from "@assets/helpers/asyncHelpers";
import AppSelect from "@/components/ui/AppSelect.jsx";
import {useHistory} from "react-router-dom";

FormSetCompanyMain.propTypes = {
   changeStep: func,
   step: number,
};

function FormSetCompanyMain({changeStep, step}) {
   const dispatch = useDispatch();
   const {lists, user} = useSelector(state => ({
      lists: state.dropDownList.lists,
      user: state.user.user
   }))
   
   const history = useHistory();
   
   const [form] = Form.useForm();
   const [isLoading, setIsLoading] = useState(false);
   const key = 'set-company';
   const adminStep = user?.name ? 3 : 2;
   
   const onFinish = async () => {
      message.loading({content: 'Загрузка...', key});
      setIsLoading(true)
      
      return await new Promise(res => {
         res(createCompany(form.getFieldsValue()));
      })
         .then(json => {
            setUserStep(adminStep);
            return json
         })
         .then(json => {
            setIsLoading(false)
            if (json.ok) {
               message.success({content: 'Данные о компании успешно сохранены!', key, duration: 4});
               if (adminStep === 3) {
                  history.push('/company-verify')
               } else {
                  changeStep(adminStep);
               }
            } else {
               message.error({content: json.message, key, duration: 4});
               form.setFields([{name: 'companyName', errors: [json.message]}, {name: 'kod', errors: [json.message]}])
            }
         })
         .catch(error => {
            setIsLoading(false)
            message.error({content: error, key, duration: 4});
         })
   }
   
   return (
      <Form
         name="set-company"
         layout='vertical'
         size='large'
         onFinish={onFinish}
         form={form}
         className='form'
      >
         <AppText text='Общее' style={{
            color: '#20272E',
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 24,
            lineHeight: 1.5715,
            display: 'block'
         }}/>
         
         <Form.Item className='form__container' name='companyName' label='Название Компании' rules={[
            {required: true, message: 'Пожалуйста, введите название компании!'}
         ]}>
            <Input className='form__input' placeholder="ООО Компания"/>
         </Form.Item>
         <Form.Item name="s_workers" label="Количество сотрудников в компании" className='form__container'>
            <AppSelect options={lists?.s_workers} placeholder="Количество сотрудников"/>
         </Form.Item>
         <Form.Item className='form__container' name='kod' label='Код ЕГРПОУ (ЄДРПОУ)/ИНН ФОП'
                    rules={[{required: true, message: 'Пожалуйста, введите Код ЕГРПОУ (ЄДРПОУ)/ИНН ФОП!'}]}
         >
            <Input type='number' className='form__input' placeholder="1234567"/>
         </Form.Item>
         
         <Form.Item className='form__container' name='s_activity' label='Сфера деятельности'>
            <AppSelect options={lists?.s_activity} placeholder="Сфера деятельности"/>
         </Form.Item>
         
         <Form.Item className='form__container' name='services' label='Услуги / Продукт'>
            <Input className='form__input' placeholder="Услуги"/>
         </Form.Item>
         <Form.Item className='form__container' name='website' label='Сайт'>
            <Input className='form__input' placeholder="https://mysite.com"/>
         </Form.Item>
         
         <Form.Item className='form__container'>
            <div className='form__row _right'>
               <Button type="primary" shape='round' htmlType="submit" disabled={isLoading}>
                  Сохранить и продолжить
               </Button>
            </div>
         </Form.Item>
      
      </Form>
   );
   
}

export default FormSetCompanyMain;