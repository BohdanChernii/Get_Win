import React, {useEffect, useState} from 'react';
import {AutoComplete, Col, Form, Input, Row} from "antd";
import {rules} from "@assets/helpers/messages";
import AppSelect from "@/components/ui/AppSelect.jsx";
import {password_generator, sortBy} from "@assets/helpers/helpers";
import {bool} from "prop-types";
import {getTestingListItems} from "@assets/helpers/asyncHelpers";

FormTestingCandidateBody.propTypes = {
   isLogin: bool.isRequired
};

function FormTestingCandidateBody({isLogin}) {
   const [newPassword, setNewPassword] = useState('');
   const [list, setList] = useState(null);
   
   useEffect(() => {
      if (!list) {
         const start = async () => {
            const data = await getTestingListItems();
            for (const name in data) {
               data[name] = sortBy(data[name], 'name')
            }
            setList(data)
         };
         start()
      }
   }, []);
   
   return (
      <Row>
         {isLogin && (
            <Col span={24}>
               <Row gutter={[24, 0]}>
                  <Col span={12}>
                     <Form.Item name='login' label='Логин' rules={[{required: true, message: rules.required}]}>
                        <Input className='form__input' placeholder="Придумайте логин"/>
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item name='password' label='Пароль' rules={[{required: true, message: rules.required}]}>
                        <AutoComplete
                           options={[{value: newPassword, option: '1'}]}
                           onFocus={() => newPassword || setNewPassword(password_generator())}
                        >
                           <Input.Password className='form__input' placeholder="Укажите ваш пароль"/>
                        </AutoComplete>
                     </Form.Item>
                  </Col>
               </Row>
            </Col>
         )}
         <Col span={24}>
            <Row gutter={[24, 0]}>
               <Col span={12}>
                  <Form.Item name='step' label='Этап тестирования' rules={[{required: true, message: rules.required}]}>
                     <AppSelect placeholder='Выберите из списка' options={list?.faq_qa_stage}/>
                  
                  </Form.Item>
               </Col>
               <Col span={12}>
                  <Form.Item name='view' label='Вид тестирования' rules={[{required: true, message: rules.required}]}>
                     <AppSelect placeholder='Выберите из списка' options={list?.faq_qa_type}/>
                  </Form.Item>
               </Col>
            </Row>
         </Col>
         
         <Col span={24}>
            <Row gutter={[24, 0]}>
               <Col span={12}>
                  <Form.Item name='language' label='Язык тестирования' rules={[{required: true, message: rules.required}]}>
                     <AppSelect placeholder='Выберите из списка' options={list?.faq_qa_lang}/>
                  </Form.Item>
               </Col>
               <Col span={12}>
                  <Form.Item name='package' label='Пакеты и методики' rules={[{required: true, message: rules.required}]}>
                     <AppSelect placeholder='Выберите из списка' options={list?.faq_qa_paks}/>
                  </Form.Item>
               </Col>
            </Row>
         </Col>
      </Row>
   );
}

export default FormTestingCandidateBody;