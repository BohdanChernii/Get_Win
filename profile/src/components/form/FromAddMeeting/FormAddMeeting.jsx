import React from 'react';
import {useSelector} from "react-redux";
import {Button, Form, Input, Row} from "antd";
import {rules} from "@assets/helpers/messages";

function FormAddMeeting({changeVisible}) {
   const [form] = Form.useForm();
   const {lists} = useSelector(state => state.dropDownList)
   const onFinish = () => {
      changeVisible()
   }
   return (
      <Form
         name="new_meeting"
         layout='vertical'
         size='large'
         onFinish={onFinish}
         form={form}
      >
         <Form.Item
            name='meeting-name'
            label='Название встречи'
            rules={[{required: true, message: rules.required}]}
         >
            <Input className='form__input' placeholder="Название встречи"/>
         </Form.Item>
         
         <Form.Item noStyle>
            <Row justify='end'>
               <Button type="primary" shape="round" htmlType="submit">
                  Подтвердить
               </Button>
            </Row>
         </Form.Item>
      </Form>
   );
}

export default FormAddMeeting;