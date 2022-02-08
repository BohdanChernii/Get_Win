import React, {useState} from 'react';
import {bool, func, object, string} from 'prop-types';
import {Col, Form, Input, Row} from "antd";
import AppSelect from "@/components/ui/AppSelect.jsx";

AddressesFields.propTypes = {
   formName: string.isRequired,
   label: string,
   office: object.isRequired,
   disabled: bool,
   onClearCity: func.isRequired,
   onSelectCity: func.isRequired,
   onSearchCity: func.isRequired,
   
   onClearStreet: func.isRequired,
   onSelectStreet: func.isRequired,
   onSearchStreet: func.isRequired,
   onChangeStreetNumber: func.isRequired,
};

const getNotFoundDescription = (list, name) => {
   return !list?.length && name?.length < 3 ? 'Введите более 2 символов' : 'Нет данных'
};

function AddressesFields(props) {
   const {
      formName,
      label,
      disabled,
      required,
      office,
      onClearCity,
      onSelectCity,
      onSearchCity,
      onSelectStreet,
      onClearStreet,
      onSearchStreet,
      onChangeStreetNumber,
   } = props;
   const {city_id, city_name, city_list, street_id, street_name, street_list} = office[formName];
   
   const [citiesLoading, setCitiesLoading] = useState(false);
   const [streetsLoading, setStreetsLoading] = useState(false);
   
   const handleOnSearchCity = async name => {
      setCitiesLoading(true);
      await onSearchCity(formName, name);
      setCitiesLoading(false);
   };
   const handleOnSearchStreet = async name => {
      setStreetsLoading(true);
      await onSearchStreet(formName, name);
      setStreetsLoading(false);
   };
   return (
      <>
         {label && (
            <div className='form__label_control'>
               <p className={`form__label ${required ? 'form__label-required' : ''}`}>
                  {label}
               </p>
            </div>
         )}
         
         <Row gutter={[12, 12]}>
            <Col span={8}>
               <Form.Item name={`${formName}_city`} rules={[{required: required, message: 'Поле обязательное'}]}>
                  <AppSelect
                     value={city_name}
                     placeholder='Город'
                     autoComplete="off"
                     disabled={disabled}
                     dropdownMatchSelectWidth={350}
                     notFoundDescription={getNotFoundDescription(city_list, city_name)}
                     onClear={() => onClearCity(formName)}
                     onSelect={option => onSelectCity(formName, option)}
                     onSearch={handleOnSearchCity}
                     options={city_list}
                     isLoading={citiesLoading}/>
               </Form.Item>
            </Col>
            <Col span={8}>
               <Form.Item name={`${formName}_street`} rules={[{required: city_id && required, message: 'Поле обязательное'}]}>
                  <AppSelect
                     placeholder='Улица'
                     autoComplete="off"
                     disabled={!city_id}
                     dropdownMatchSelectWidth={350}
                     notFoundDescription={getNotFoundDescription(street_list, street_name)}
                     onClear={() => onClearStreet(formName)}
                     onSelect={option => onSelectStreet(formName, option)}
                     onSearch={handleOnSearchStreet}
                     options={street_list}
                     isLoading={streetsLoading}
                  />
               </Form.Item>
            </Col>
            <Col span={8}>
               <Form.Item
                  name={`${formName}_street_number`}
                  rules={[{required: street_id && required, message: 'Поле обязательное'}]}>
                  <Input
                     onChange={(e) => onChangeStreetNumber(formName, e.target.value)}
                     autoComplete="off"
                     disabled={!street_id}
                     className='form__input'
                     placeholder="Номер улици"/>
               </Form.Item>
            </Col>
         </Row>
      </>
   );
}

export default AddressesFields;