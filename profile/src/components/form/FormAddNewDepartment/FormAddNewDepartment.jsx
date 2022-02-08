import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Input, message, Row, Switch} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {func} from "prop-types";
import AppSelect from "@/components/ui/AppSelect.jsx";
import {getAddressesList} from "@store/actions/addresses-actions";
import AddressesFields from "@/components/components/AddressesFields/AddressesFields.jsx";
import {useAddressesFields} from "@/hooks/useAddressesFields";
import {rules} from "@assets/helpers/messages";

FormAddNewDepartment.propTypes = {
   changeVisible: func,
   onSubmit: func,
};

function FormAddNewDepartment({changeVisible, onSubmit}) {
   const [form] = Form.useForm();
   const dispatch = useDispatch();
   const {
      lists,
      addressesList: {loading: addressesLoading, list: addressesList}
   } = useSelector(state => ({
      lists: state.dropDownList.lists,
      addressesList: state.addresses,
   }))
   
   const {
      offices,
      onClearCity,
      onClearStreet,
      
      onSelectCity,
      onSelectStreet,
      
      onSearchCity,
      onSearchStreet,
      onChangeStreetNumber,
   } = useAddressesFields(form, ['address'])
   
   const [loadingBtn, setLoadingBtn] = useState(false);
   const [isSelectAddress, setIsSelectAddress] = useState(true);
   
   const onClearForm = () => {
      setIsSelectAddress(true)
      onClearCity('address')
      onClearStreet('address')
      form.resetFields();
      changeVisible()
   }
   
   const onFinish = async () => {
      const formValues = form.getFieldsValue();
      setLoadingBtn(true);
      try {
         const departmentName = lists?.tl_lists.find(list => list.name === formValues.name)?.name;
         if (departmentName) {
            setLoadingBtn(false);
            form.setFields([{name: 'name', errors: [`Отдел с названием ${departmentName} уже существует.`]}]);
            return message.error(<span>Отдел с названием<strong> {departmentName} </strong>уже существует.</span>);
         }
         
         formValues.is_new_address = !isSelectAddress;
         let {address, category, is_new_address, manager_middle_name, manager_name, manager_position, manager_surname, name} = formValues;
         
         if (isSelectAddress) {
            address = address.map(addressName => {
               const currentAddress = {...addressesList.find(el => el.name === addressName)};
               const data = currentAddress.name.split(' ');
               const city_name = data[0]
               const street_name = data.slice(1, data.length - 1).join(' ');
               const street_number = data[data.length - 1]
               
               delete currentAddress.id
               delete currentAddress.name
               return {
                  ...currentAddress,
                  city_name,
                  street_name,
                  street_number
               }
            });
         } else {
            const copyOffice = {...offices};
            delete copyOffice.address.city_list
            delete copyOffice.address.street_list
            address = {
               nameOffice: null,
               registeredOffice: null,
               actualOffice: {...copyOffice.address}
            }
         }
         await onSubmit({address, category, is_new_address, manager_middle_name, manager_name, manager_position, manager_surname, name});
         await dispatch(getAddressesList());
         onClearForm();
      } catch (err) {
         console.error(err);
         message.error(err.message)
      } finally {
         setLoadingBtn(false)
      }
   };
   
   useEffect(() => {
      if (!isSelectAddress) {
         form.resetFields(['address'])
      } else {
         form.resetFields(['address_citi', 'address_street', 'address_street_number'])
      }
   }, [isSelectAddress]);
   return (
      <Form
         name="new_department"
         layout='vertical'
         size='large'
         onFinish={onFinish}
         form={form}
      >
         <Form.Item name='name' label='Название отдела' rules={[{required: true, message: rules.required}]}>
            <Input className='form__input' placeholder="Название отдела"/>
         </Form.Item>
         <Form.Item name='category' label='Категория отдела' rules={[{required: true, message: rules.required}]}>
            <AppSelect options={lists?.tl_lists.filter(item => item.type === 'global')} placeholder='Выберите из списка'/>
         </Form.Item>
         <Form.Item name='manager_position' label='Название должности руководителя'>
            <Input className='form__input' placeholder="Директор"/>
         </Form.Item>
         <Form.Item noStyle>
            <Row gutter={24}>
               <Col span={8}>
                  <Form.Item name='manager_name' label='Имя Руководителя'>
                     <Input className='form__input' placeholder="Имя Руководителя"/>
                  </Form.Item>
               </Col>
               <Col span={8}>
                  <Form.Item name='manager_surname' label='Фамилия Руководителя'>
                     <Input className='form__input' placeholder="Фамилия Руководителя"/>
                  </Form.Item>
               </Col>
               <Col span={8}>
                  <Form.Item name='manager_middle_name' label='Отчество Руководителя'>
                     <Input className='form__input' placeholder="Отчество Руководителя"/>
                  </Form.Item>
               </Col>
            </Row>
         </Form.Item>
         
         <Form.Item noStyle>
            <p className='form__label form__label-required'>Адрес Отдела / Подразделения / Направления</p>
            <Row gutter={10}>
               <Col span={6}>
                  <Form.Item name='is_new_address' style={{marginBottom: 0}}>
                     <Switch style={{width: '100%', top: '12%'}}
                             value={isSelectAddress}
                             checkedChildren="Выбрать адрес"
                             unCheckedChildren="Добавить адрес"
                             checked={isSelectAddress}
                             onChange={setIsSelectAddress}/>
                  </Form.Item>
               </Col>
               <Col flex={1}>
                  <Form.Item name='address' rules={[{required: isSelectAddress, message: 'Поле обязательное'}]}>
                     <AppSelect
                        disabled={!isSelectAddress}
                        isLoading={addressesLoading}
                        options={addressesList || []}
                        placeholder="Укажите адрес"
                        mode='multiple'
                        onDropdownVisibleChange={open => open && !addressesList && dispatch(getAddressesList())}
                     />
                  </Form.Item>
               </Col>
            </Row>
            <Form.Item style={{marginBottom: 0}}>
               <AddressesFields
                  disabled={isSelectAddress}
                  required={!isSelectAddress}
                  formName='address'
                  office={offices}
                  onClearCity={onClearCity}
                  onSelectCity={onSelectCity}
                  onSearchCity={onSearchCity}
                  onSelectStreet={onSelectStreet}
                  onClearStreet={onClearStreet}
                  onSearchStreet={onSearchStreet}
                  onChangeStreetNumber={onChangeStreetNumber}
               />
            </Form.Item>
         </Form.Item>
         <Form.Item noStyle>
            <Row justify='end'>
               <Button type="primary" htmlType="submit" shape='round' loading={loadingBtn} disabled={loadingBtn}>
                  Добавить отдел
               </Button>
            </Row>
         </Form.Item>
      </Form>
   );
}

export default FormAddNewDepartment;