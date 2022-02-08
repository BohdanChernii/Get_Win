import React, {useEffect} from 'react';
import {func, string} from 'prop-types';
import {Button, Col, Form, Row} from "antd";
import AppSelect from "@/components/ui/AppSelect.jsx";
import {useForm} from "antd/es/form/Form";

FormAddUser.propTypes = {
   onSubmitForm: func,
   onCancel: func,
   cancelText: string,
};

function FormAddUser({onSubmitForm, onCancel, cancelText, info}) {
   const [form] = useForm();
   // todo треба розуміти який має бути список юзерів
   const defaultUsers = [
      {id: 1, name: 'Yurii Khimka', description: 'yurii_khimka@gmail.com'},
      {id: 2, name: 'Sergey Nikolaev', description: 'sergey_nikolaev@gmail.com'},
      {id: 3, name: 'franysya', description: 'franysya@gmail.com'},
      {id: 4, name: 'Yurii Khimka', description: 'psyprofusion@gmail.com'},
      {id: 5, name: 'ratsebarskaya2020', description: 'ratsebarskaya2020@gmail.com'},
      {id: 6, name: 'rezvykh.evgeniya', description: 'rezvykh.evgeniya@gmail.com	'},
      {id: 7, name: 'ds@ds1', description: 'ds@ds1.net.ua	'},
      {id: 8, name: 'ruslan.horyn95', description: 'ruslan.horyn95@gmail.com	'},
      {id: 9, name: 'ruslan@filesa', description: 'ruslan@filesa.site'},
   ]
   
   const onFinish = () => {
      const values = form.getFieldsValue();
      values.users = values.users
         ? values.users.map(userId => {
            const {id, name} = defaultUsers.find(user => user.id.toString() === userId.toString());
            return {id, name}
         })
         : []
      onSubmitForm(values);
   };
   
   useEffect(() => {
      if (info) {
         console.log(info)
         form.setFields([
            {name: 'users', value: info?.users?.length > 0 ? info.users.map(({id}) => parseInt(id)) : []},
         ])
      }
   }, [info]);
   
   return (
      <Form
         name="add-users"
         layout='vertical'
         size='large'
         className='form'
         form={form}
         onFinish={onFinish}>
         <div className="form__wrapper">
            <div className="form__body">
               <Row>
                  <Col span={24}>
                     <Form.Item label='Пользователи'>
                        <Form.Item noStyle name="users">
                           <AppSelect placeholder='Добавить пользователя или укажите Email' mode='multiple' options={defaultUsers} isIdValue/>
                        </Form.Item>
                     </Form.Item>
                  </Col>
               </Row>
            </div>
            <div className="form__footer">
               <Row justify={onCancel ? `space-between` : 'end'} align='bottom'>
                  {onCancel && (
                     <Col>
                        <Button type="default" shape="round" onClick={onCancel}>
                           {cancelText}
                        </Button>
                     </Col>
                  )}
                  <Col>
                     <Button type="primary" shape="round" htmlType="submit">
                        Дальше
                     </Button>
                  </Col>
               </Row>
            </div>
         </div>
      
      </Form>
   );
}

export default FormAddUser;