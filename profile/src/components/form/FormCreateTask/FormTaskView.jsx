import React from 'react';
import {bool, func, number} from 'prop-types';
import {useForm} from "antd/es/form/Form";
import {Button, Checkbox, Col, Form, Row} from "antd";

FormTaskView.propTypes = {
   step: number,
   changeStep: func,
   changeIsDuplicate: func,
   isDuplicate: bool,
};

function FormTaskView({step, changeStep, isDuplicate, changeIsDuplicate}) {
   const [form] = useForm();
   
   const onFinish = () => {
      console.log(form.getFieldsValue());
      changeStep(step + 1)
   }
   return (
      <Form
         name="task-view"
         layout='vertical'
         size='large'
         onFinish={onFinish}
         className='form'
         form={form}>
         <div className="form__wrapper">
            <div className="form__body">
               <p>form__body</p>
            </div>
            <div className="form__footer">
               <Row justify='space-between' align='middle' gutter={[12, 12]}>
                  <Col span={5}>
                     <Button type="default" shape="round" htmlType="button" onClick={() => changeStep(step - 1)}>
                        Назад
                     </Button>
                  </Col>
                  <Col span={11}>
                     <Row align='middle' justify='end'>
                        <Col>
                           <Row align='middle' wrap={false}>
                              <Checkbox style={{fontSize: 12}} checked={isDuplicate} onChange={e => changeIsDuplicate(e.target.checked)}>
                                 Дублировать задачу
                              </Checkbox>
                           </Row>
                        </Col>
                     </Row>
                  </Col>
                  <Col span={8}>
                     <Row align='middle' justify='end'>
                        <Col>
                           <Button type="primary" shape="round" htmlType="submit">
                              Создать
                           </Button>
                        </Col>
                     </Row>
                  </Col>
               </Row>
            </div>
         </div>
      </Form>
   );
}

export default FormTaskView;