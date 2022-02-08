import React, {useEffect, useState} from 'react';
import {func, number} from 'prop-types';
import {Button, Col, Form, message, Row} from "antd";
import {checkFormValues, getCurrentValues} from "@assets/helpers/helpers";
import AppText from "@/components/ui/AppText.jsx";
import AppSelect from "@/components/ui/AppSelect.jsx";
import AppDatePicker from "@/components/ui/AppDatePicker.jsx";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {setNewPositionsInfo} from "@store/actions/positions-actions";

FormSetPositionCar.propTypes = {
   changeStep: func,
   step: number,
};

function FormSetPositionCar({changeStep, step}) {
   const [form] = Form.useForm();
   const dispatch = useDispatch();
   const {lists, positions: {info}} = useSelector(state => ({
      positions: state.positions,
      lists: state.dropDownList.lists,
   }))
   const [isCarAvailable, setIsCarAvailable] = useState(false);
   const handleOnChangeCarAvailable = value => {
      if (value === 'Да') {
         setIsCarAvailable(true)
      } else {
         setIsCarAvailable(false)
         form.resetFields()
      }
   }
   const onFinish = async () => {
      const values = checkFormValues(form.getFieldsValue());
      values.driver_categories = getCurrentValues(values.driver_categories, lists.s_driving_license_category);
      values.driving_experience = values.driving_experience ? moment(values.driving_experience).format('DD.MM.YYYY') : null;
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
         const {car_available, driver_categories, driver_license, driving_experience} = info
         const time = driving_experience && driving_experience.split('.').reverse().join('');
         if (driver_license?.toLowerCase() === 'да') {
            setIsCarAvailable(true)
         }
         form.setFields([
            {name: 'driver_license', value: driver_license},
            {name: 'car_available', value: car_available ? car_available : null},
            {name: 'driver_categories', value: driver_categories ? driver_categories.map(({name}) => name) : []},
            {name: 'driving_experience', value: driving_experience ? moment(time) : null},
         ])
      }
   }, [info]);
   
   const selectOption = [{id: 0, name: 'Нет'}, {id: 1, name: 'Да'}]
   return (
      <Form
         name="set-position-car"
         layout='vertical'
         size='large'
         onFinish={onFinish}
         form={form}
         initialValues={{
            driver_license: 'Нет',
         }}
         className='form'>
         <AppText text='Авто'
                  style={{color: '#20272E', fontSize: 18, fontWeight: 700, marginBottom: 24, lineHeight: 1.5715, display: 'block'}}/>
         <Row gutter={[24, 0]}>
            
            <Col span={24}>
               <Row gutter={[24, 0]}>
                  <Col flex={1}>
                     <Form.Item label='Водительские права' name='driver_license'>
                        <AppSelect options={selectOption} placeholder="Водительские права" onChange={handleOnChangeCarAvailable}/>
                     </Form.Item>
                  </Col>
                  <Col flex='0 0 216px'>
                     <Form.Item label='Категории' name='driver_categories'>
                        <AppSelect disabled={!isCarAvailable} options={lists?.s_driving_license_category} placeholder="Выберите категорию"
                                   mode='multiple'/>
                     </Form.Item>
                  </Col>
               </Row>
            </Col>
            
            <Col span={24}>
               <Row gutter={[24, 0]}>
                  <Col flex={1}>
                     <Form.Item label='Стаж вождения' name='driving_experience'>
                        <AppDatePicker disabled={!isCarAvailable} placeholder='Укажите стаж'/>
                     </Form.Item>
                  </Col>
                  <Col flex='0 0 216px'>
                     <Form.Item label='Наличие авто' name='car_available'>
                        <AppSelect disabled={!isCarAvailable} options={selectOption} placeholder="Наличие авто"/>
                     </Form.Item>
                  </Col>
               </Row>
            </Col>
         </Row>
         <Row wrap={false} align='middle' justify='space-between'>
            <Col>
               <Button type="default" htmlType="button" shape="round" onClick={() => changeStep(step - 1)}>
                  Назад
               </Button>
            </Col>
            <Col>
               <Button type="primary" shape="round" htmlType="submit">
                  Сохранить и продолжить
               </Button>
            </Col>
         </Row>
      </Form>
   );
}

export default FormSetPositionCar;