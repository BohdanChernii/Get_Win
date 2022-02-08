import React from 'react';
import {Button, Col, Form, message, Row} from "antd";
import {checkFormValues} from "@assets/helpers/helpers";
import AppSelect from "@/components/ui/AppSelect.jsx";
import {func} from "prop-types";
import {useSelector} from "react-redux";
import AppText from "@/components/ui/AppText.jsx";
import {useAddItemToDropDownList} from "@/hooks/useAddItemToDropDownList";
import {rules} from "@assets/helpers/messages";

FormAddLanguages.propTypes = {
   changeVisible: func,
   onSubmitForm: func,
};

function FormAddLanguages({changeVisible, onSubmitForm}) {
   const [form] = Form.useForm();
   const addLanguages = useAddItemToDropDownList()
   const {dropDownList,} = useSelector(state => ({dropDownList: state.dropDownList.lists}));
   
   const onFinish = () => {
      const values = checkFormValues(form.getFieldsValue())
      onSubmitForm(values)
      form.resetFields()
      changeVisible()
   }
   const handleOnAddLanguages = async name => {
      try {
         await addLanguages('s_languages', name);
      } catch (err) {
         console.error(err)
         message.error(err.message)
         throw err
      }
   }
   return (
      <Form
         style={{height: '100%'}}
         name="add-program"
         layout='vertical'
         size='large'
         onFinish={onFinish}
         form={form}>
         <Row style={{height: '100%'}}>
            <Col span={24}>
               <AppText
                  text='Владение языками'
                  style={{color: '#20272E', fontSize: 18, fontWeight: 700, marginBottom: 24, lineHeight: 1.5715, display: 'block'}}/>
               <Form.Item className='form__container' label='Язык' name='name' rules={[{required: true, message: rules.required}]}>
                  <AppSelect options={dropDownList?.s_languages} placeholder='Напишите или выберите из списка' isHaveFooter
                             onSubmit={handleOnAddLanguages}/>
               </Form.Item>
               <Form.Item className='form__container' label='Уровень владения' name='levels'
                          rules={[{required: true, message: rules.required}]}>
                  <AppSelect options={dropDownList?.s_language_levels} placeholder='Выберите из списка'/>
               </Form.Item>
            </Col>
            
            <Col span={24}>
               <Row justify='end' align='bottom' style={{height: '100%'}}>
                  <Col>
                     <Button type="primary" shape="round" htmlType="submit">
                        Сохранить
                     </Button>
                  </Col>
               </Row>
            </Col>
         </Row>
      </Form>
   );
}

export default FormAddLanguages;