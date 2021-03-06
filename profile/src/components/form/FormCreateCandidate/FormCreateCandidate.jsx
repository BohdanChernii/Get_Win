import React, {useEffect} from 'react';
import {func, number} from 'prop-types';
import {Button, Col, Form, Input, Row} from "antd";
import {useForm} from "antd/es/form/Form";
import {useDispatch, useSelector} from "react-redux";
import AppSelect from "@/components/ui/AppSelect.jsx";
import AppDatePicker from "@/components/ui/AppDatePicker.jsx";
import {checkFormValues, getCurrentValues} from "@assets/helpers/helpers";
import moment from "moment";
import InputMask from "react-input-mask";
import {setCandidateInfo} from "@store/actions/candidates-actions";
import {rules} from "@assets/helpers/messages";

FormCreateCandidate.propTypes = {
   step: number,
   changeStep: func
};

function FormCreateCandidate({step, changeStep}) {
   const [form] = useForm();
   const dispatch = useDispatch();
   const {
      lists,
      candidate,
   } = useSelector(state => ({
      lists: state.dropDownList.lists,
      candidate: state.candidates.info,
   }));
   
   const onFinish = () => {
      const values = checkFormValues(form.getFieldsValue());
      values.gender = getCurrentValues(values.gender, lists.tools_sex);
      values.birthday = values.birthday ? moment(values.birthday).format('DD.MM.YYYY') : null;
      dispatch(setCandidateInfo(values));
      form.resetFields()
      changeStep(step + 1)
   }
   
   useEffect(() => {
      if (candidate) {
         const birthday = candidate?.birthday && candidate?.birthday.split('.').reverse().join('');
         form.setFields([
            {name: 'first_name', value: candidate?.first_name},
            {name: 'last_name', value: candidate?.last_name},
            {name: 'middle_name', value: candidate?.middle_name},
            {name: 'birthday', value: birthday ? moment(birthday) : null},
            {name: 'gender', value: candidate?.gender?.name},
            {name: 'tel', value: candidate?.tel},
            {name: 'email', value: candidate?.email},
         ])
      }
   }, [candidate]);
   
   return (
      <Form
         name="create-candidate"
         layout='vertical'
         size='large'
         onFinish={onFinish}
         className='form'
         form={form}>
         <div className="form__wrapper">
            <div className="form__body">
               <Row>
                  <Col span={24}>
                     <Row gutter={[24, 0]}>
                        <Col span={8}>
                           <Form.Item
                              label='??????????????'
                              name='last_name'
                              rules={[{required: true, message: rules.required}]}>
                              <Input className='form__input' placeholder="??????????????"/>
                           </Form.Item>
                        </Col>
                        <Col span={8}>
                           <Form.Item
                              label='??????'
                              name='first_name'
                              rules={[{required: true, message: rules.required}]}>
                              <Input className='form__input' placeholder="??????"/>
                           </Form.Item>
                        </Col>
                        <Col span={8}>
                           <Form.Item label='????????????????' name='middle_name'>
                              <Input className='form__input' placeholder="????????????????"/>
                           </Form.Item>
                        </Col>
                     </Row>
                  </Col>
                  <Col span={24}>
                     <Row gutter={[24, 0]}>
                        <Col span={12}>
                           <Form.Item
                              label='???????? ????????????????'
                              name='birthday'
                              rules={[{required: true, message: rules.required}]}>
                              <AppDatePicker placeholder='?????????????? ???????? ????????????????'/>
                           </Form.Item>
                        </Col>
                        <Col span={12}>
                           <Form.Item label='??????' name='gender' rules={[{required: true, message: rules.required}]}>
                              <AppSelect options={lists?.tools_sex} placeholder='??????????????/??????????????'/>
                           </Form.Item>
                        </Col>
                     </Row>
                  </Col>
                  <Col span={24}>
                     <Row gutter={[24, 0]}>
                        <Col span={12}>
                           <Form.Item label='?????????? ????????????????' name='tel' rules={[{required: true, message: rules.required}]}>
                              <InputMask
                                 mask="+380 99 99 99 999"
                                 maskChar=" ">
                                 {() => (<Input className='form__input' placeholder="+380 97 777 77 77"/>)}
                              </InputMask>
                           </Form.Item>
                        </Col>
                        <Col span={12}>
                           <Form.Item
                              label='?????????????????????? ??????????'
                              name='email'
                              rules={[{type: 'email', message: "???? ???????????????? ??????????!"}]}>
                              <Input className='form__input' placeholder="youremail@mail.com"/>
                           </Form.Item>
                        </Col>
                     </Row>
                  </Col>
               </Row>
            </div>
            <div className="form__footer">
               <Row align='middle' justify='space-between'>
                  <Col>
                     <Button type="default" shape="round" htmlType="button" onClick={() => changeStep(step - 1)}>
                        ????????????
                     </Button>
                  </Col>
                  <Col>
                     <Button type="primary" shape="round" htmlType="submit">
                        ????????????
                     </Button>
                  </Col>
               </Row>
            </div>
         </div>
      </Form>
   );
}

export default FormCreateCandidate;