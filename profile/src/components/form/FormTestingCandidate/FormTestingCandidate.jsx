import React, {useState} from 'react';
import {func} from 'prop-types';
import {useForm} from "antd/es/form/Form";
import {Button, Col, Form, Row, Tabs} from "antd";
import FormTestingCandidateBody from "@/components/form/FormTestingCandidate/FormTestingCandidateBody.jsx";

FormTestingCandidate.propTypes = {
   onFinishTest: func,
   onCancel: func,
};

function FormTestingCandidate({onFinishTest, onCancel}) {
   const [form] = useForm();
   const [isLogin, setIsLogin] = useState(false);
   
   const onFinish = () => {
      // todo тут відправка на тестування
      (form.getFieldsValue())
      onFinishTest()
   }
   return (
      <Form
         name="testing-candidate"
         layout='vertical'
         size='large'
         onFinish={onFinish}
         className='form'
         form={form}>
         <div className="form__wrapper">
            <div className="form__body">
               <Tabs onChange={activeKey => setIsLogin(activeKey === '2')} centered tabBarStyle={{width: '65%', margin: 'auto auto 48px'}}>
                  <Tabs.TabPane tab="Ссылка" key="1"/>
                  <Tabs.TabPane tab="Авторизация" key="2"/>
               </Tabs>
               <FormTestingCandidateBody isLogin={isLogin}/>
            </div>
            <div className="form__footer">
               <Row align='middle' justify='space-between'>
                  <Col>
                     <Button type="default" shape="round" htmlType="button" onClick={onCancel}>
                        Отмена
                     </Button>
                  </Col>
                  <Col>
                     <Button type="primary" shape="round" htmlType="submit">
                        Зарегистрировать и отправить
                     </Button>
                  </Col>
               </Row>
            </div>
         </div>
      </Form>
   );
}

export default FormTestingCandidate;