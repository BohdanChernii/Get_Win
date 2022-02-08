import React, {useEffect, useState} from 'react';
import {func, number} from 'prop-types';
import {Button, Col, Form, Input, message, Row, Switch} from "antd";
import {checkFormValues, getCurrentValues} from "@assets/helpers/helpers";
import AppText from "@/components/ui/AppText.jsx";
import AppSelect from "@/components/ui/AppSelect.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setNewPositionsInfo} from "@store/actions/positions-actions";

FormSetPositionFamilyStatus.propTypes = {
   changeStep: func,
   step: number,
};

function FormSetPositionFamilyStatus({changeStep, step}) {
   const [form] = Form.useForm();
   const dispatch = useDispatch();
   const {lists, positions: {info}} = useSelector(state => ({
      positions: state.positions,
      lists: state.dropDownList.lists,
   }))
   
   const [isSwitch, setIsSwitch] = useState(true);
   const handleOnChangeSwitch = (open) => {
      if (!open) {
         form.resetFields(['age_from', 'age_to']);
      }
      setIsSwitch(open)
   };
   
   const onFinish = async () => {
      const values = checkFormValues(form.getFieldsValue());
      values.family_status = getCurrentValues(values.family_status, lists.s_family_status);
      values.gender = getCurrentValues(values.gender, lists.tools_sex);
      if (values.age_from || values.age_to) {
         values.age = {from: values.age_from, to: values.age_to}
      }
      delete values.age_from
      delete values.age_to
      try {
         dispatch(setNewPositionsInfo(values))
         changeStep(step + 1);
      } catch (err) {
         message.error(err.message);
         throw err
      }
   }
   useEffect(() => {
      if (info) {
         const {age, family_status, gender, kids,} = info
         const time = {
            from: age?.from ? age.from : null,
            to: age?.to ? age.to : null
         }
         form.setFields([
            {name: 'age_from', value: time.from},
            {name: 'age_to', value: time.to},
            {name: 'family_status', value: family_status?.name ? family_status.name : null},
            {name: 'gender', value: gender?.name ? gender.name : null},
            {name: 'kids', value: kids ? kids : null},
         ])
      }
   }, [info]);
   return (
      <Form
         name="set-position-marital-status"
         layout='vertical'
         size='large'
         onFinish={onFinish}
         form={form}
         className='form'>
         <AppText text='Возраст и семейное положение'
                  style={{
                     color: '#20272E',
                     fontSize: 18,
                     fontWeight: 700,
                     marginBottom: 24,
                     lineHeight: 1.5715,
                     display: 'block'
                  }}/>
         
         <Form.Item label="Возраст">
            <Row align='middle' gutter={12} wrap={false}>
               <Col span={8}>
                  <Switch style={{width: '100%'}} defaultChecked onChange={handleOnChangeSwitch} checkedChildren='Имеет значение'
                          unCheckedChildren='Не имеет значение'/>
               </Col>
               <Col flex={1}>
                  <Row gutter={6}>
                     <Col span={12}>
                        <Form.Item name="age_from" noStyle>
                           <Input type='number' disabled={!isSwitch} className='form__input' placeholder="От"/>
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item name="age_to" noStyle>
                           <Input type='number' disabled={!isSwitch} className='form__input' placeholder="До"/>
                        </Form.Item>
                     </Col>
                  </Row>
               </Col>
            </Row>
         </Form.Item>
         
         <Form.Item className='form__container' label='Пол' name='gender'>
            <AppSelect options={lists?.tools_sex} placeholder='Напишите или выберите из списка'/>
         </Form.Item>
         
         <Form.Item className='form__container' label='Семейное положение' name='family_status'>
            <AppSelect options={lists?.s_family_status} placeholder='Напишите или выберите из списка'/>
         </Form.Item>
         
         <Form.Item className='form__container' label='Дети' name='kids'>
            <Input type='number' className='form__input' placeholder="Выберите количество"/>
         </Form.Item>
         <Form.Item className='form__container'>
            <div className='form__row _between'>
               <Button type="default" htmlType="button" shape="round" onClick={() => changeStep(step - 1)}>
                  Назад
               </Button>
               <Button type="primary" shape="round" htmlType="submit">
                  Сохранить и продолжить
               </Button>
            </div>
         </Form.Item>
      </Form>
   );
}

export default FormSetPositionFamilyStatus;