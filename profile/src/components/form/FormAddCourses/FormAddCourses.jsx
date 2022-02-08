import React from 'react';
import {func} from 'prop-types';
import {Button, Col, Form, Input, Row} from "antd";
import {checkFormValues} from "@assets/helpers/helpers";
import AppDatePicker from "@/components/ui/AppDatePicker.jsx";
import moment from "moment";
import {rules} from "@assets/helpers/messages";

FormAddCourses.propTypes = {
   changeVisible: func,
   onSubmitForm: func,
};

function FormAddCourses({changeVisible, onSubmitForm}) {
   const [form] = Form.useForm();
   
   const onFinish = () => {
      const values = checkFormValues(form.getFieldsValue());
      const {year_end, year_start} = {...form.getFieldsValue(['year_end', 'year_start'])}
      
      const yearEnd = year_end ? moment(year_end).format('YYYY') : null
      const yearStart = year_start ? moment(year_start).format('YYYY') : null
      values.year_end = yearEnd
      values.year_start = yearStart
      onSubmitForm(values)
      form.resetFields()
      changeVisible()
   }
   
   
   return (
      <Form
         style={{height: '100%'}}
         name="add-courses"
         layout='vertical'
         size='large'
         onFinish={onFinish}
         form={form}>
         <Row style={{height: '100%'}}>
            <Col span={24}>
               <Form.Item className='form__container' label='Название курса' name='name'
                          rules={[{required: true, message: rules.required}]}>
                  <Input type='text'
                         className='form__input'
                         placeholder="Напишите название курса"/>
               </Form.Item>
               
               <Form.Item noStyle>
                  <div className="form__row">
                     <Form.Item style={{flex: 1}} name="year_start" label="Год поступления"
                                rules={[{required: true, message: rules.required}]}>
                        <AppDatePicker placeholder='2007' picker='year' format='YYYY'/>
                     </Form.Item>
                     <Form.Item style={{flex: 1}} name="year_end" label="Год окончания">
                        <AppDatePicker placeholder='2012' picker='year' format='YYYY'/>
                     </Form.Item>
                  </div>
               </Form.Item>
               
               
               <Form.Item className='form__container' label='Специальность'
                          name='specialty' rules={[{required: true, message: rules.required}]}>
                  <Input placeholder='Введите специальность' className='form__input'/>
               </Form.Item>
            </Col>
            <Col span={24}>
               <Row style={{height: '100%'}} justify='end' align='bottom'>
                  <Col>
                     <Button type="primary" shape="round" htmlType="submit">
                        Добавить курс
                     </Button>
                  </Col>
               </Row>
            </Col>
         </Row>
      </Form>
   );
}

export default FormAddCourses;