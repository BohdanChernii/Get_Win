import React, {useState} from 'react';
import {func} from 'prop-types';
import {Button, Col, Form, Input, message, Row} from "antd";
import {checkFormValues} from "@assets/helpers/helpers";
import AppSelect from "@/components/ui/AppSelect.jsx";
import AppDatePicker from "@/components/ui/AppDatePicker.jsx";
import moment from "moment";
import {useSelector} from "react-redux";
import {getUniversities} from "@assets/helpers/asyncHelpers";
import {rules} from "@assets/helpers/messages";

FormAddUniversity.propTypes = {
   changeVisible: func,
   onSubmitForm: func,
};

function FormAddUniversity({changeVisible, onSubmitForm}) {
   const [form] = Form.useForm();
   
   const {lists} = useSelector(state => ({lists: state.dropDownList.lists}));
   
   const [loading, setLoading] = useState(false);
   const [options, setOptions] = useState([]);
   
   const handleOnGetUniversities = async open => {
      if (open && options.length === 0) {
         setLoading(true)
         try {
            const list = await getUniversities();
            setOptions(list)
         } catch (err) {
            message.error(err)
         } finally {
            setLoading(false)
         }
      }
   }
   
   const onFinish = () => {
      const values = checkFormValues(form.getFieldsValue());
      values.year_end = values.year_end ? moment(values.year_end).format('YYYY') : null;
      values.year_start = values.year_start ? moment(values.year_start).format('YYYY') : null;
      values.id = options.find(option => option.name === values.name).id;
      onSubmitForm(values)
      form.resetFields()
      changeVisible()
   }
   
   return (
      <Form
         style={{height: '100%'}}
         name="add-universities"
         layout='vertical'
         size='large'
         onFinish={onFinish}
         form={form}>
         <Row style={{height: '100%'}}>
            <Col span={24}>
               <Form.Item className='form__container' label='ВУЗ (название)' name='name'
                          rules={[{required: true, message: rules.required}]}>
                  <AppSelect onDropdownVisibleChange={handleOnGetUniversities} options={options} isLoading={loading}
                             placeholder='Напишите или выберите из списка'/>
               </Form.Item>
               
               <Form.Item noStyle>
                  <div className="form__row">
                     <Form.Item style={{flex: 1}} name="year_start" label="Год поступления ВУЗа"
                                rules={[{required: true, message: rules.required}]}>
                        <AppDatePicker placeholder='2007' picker='year' format='YYYY'/>
                     </Form.Item>
                     <Form.Item style={{flex: 1}} name="year_end" label="Год окончания ВУЗа">
                        <AppDatePicker placeholder='2012' picker='year' format='YYYY'/>
                     </Form.Item>
                  </div>
               </Form.Item>
               
               <Form.Item className='form__container' label='Специальность' name='specialty'
                          rules={[{required: true, message: rules.required}]}>
                  <Input placeholder='Введите специальность' className='form__input'/>
               </Form.Item>
               
               <Form.Item className='form__container' label='Образовательно-квалификационный уровень'
                          name='educational_level'>
                  <AppSelect options={lists?.s_educational_level} placeholder='Напишите или выберите из списка'/>
               </Form.Item>
            </Col>
            <Col span={24}>
               <Row style={{height: '100%'}} justify='end' align='bottom'>
                  <Col>
                     <Button type="primary" shape="round" htmlType="submit">
                        Добавить ВУЗ
                     </Button>
                  </Col>
               </Row>
            </Col>
         </Row>
      </Form>
   );
}

export default FormAddUniversity;
