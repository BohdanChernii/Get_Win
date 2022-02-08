import React from 'react';
import {Form, Input, message, Modal} from "antd";
import AppTitle from "@/components/ui/AppTitle.jsx";
import InputMask from "react-input-mask";
import {bool, func} from "prop-types";
import AddressesFields from "@/components/components/AddressesFields/AddressesFields.jsx";
import {useAddressesFields} from "@/hooks/useAddressesFields";
import {MdFileCopy} from "react-icons/md";

RegionalOfficeModal.propTypes = {
   visible: bool,
   changeVisible: func,
   submitForm: func,
};

function RegionalOfficeModal({visible, changeVisible, submitForm,}) {
   const [form] = Form.useForm();
   const {
      offices,
      onClearCity,
      onSelectCity,
      onSearchCity,
      onClearStreet,
      onSelectStreet,
      onSearchStreet,
      onChangeStreetNumber,
      copyRegisteredOffice,
      copyActualOffice
   } = useAddressesFields(form, ['registeredOffice', 'actualOffice'])
   
   const handleOnCancel = () => {
      form.resetFields();
      onClearCity('registeredOffice')
      onClearStreet('actualOffice')
      changeVisible(false);
   }
   const handleSubmit = async () => {
      const formValues = form.getFieldsValue();
      const {email, nameOffice, tel, website} = formValues;
      const allOffices = {...offices}
      for (const address in allOffices) {
         delete allOffices[address].city_list;
         delete allOffices[address].street_list;
      }
      try {
         await form.validateFields();
         submitForm({email, nameOffice, tel, website, ...allOffices});
      } catch (errorInfo) {
         message.error({content: 'Веддете обезатильние поля', duration: 2})
      }
   }
   
   return (
      <Modal
         centered
         bodyStyle={{padding: '56px 24px 24px'}}
         visible={visible}
         onCancel={handleOnCancel}
         okButtonProps={{
            size: 'middle',
            onClick: handleSubmit,
            shape: 'round'
         }}
         cancelButtonProps={{
            shape: 'round'
         }}
         okText='Сохранить'
         cancelText='Отменить'
      >
         <Form
            name="add-regional-office"
            layout='vertical'
            size='large'
            form={form}
            className='form'
            style={{padding: 0}}
         >
            <AppTitle level={5} title='Офис в регионах'
                      style={{color: '#20272E', fontWeight: 500, marginBottom: 40, textAlign: 'center'}}/>
            
            <Form.Item name='nameOffice' label='Название офиса'
                       rules={[{required: true, message: 'Веедите Название офиса'}]}>
               <Input className='form__input' placeholder="Крещатик, 8. г. Киев"/>
            </Form.Item>
            {/*Юридический адрес*/}
            <Form.Item
               className='form__item'
               required
               tooltip={{
                  title: <span className='center_text' onClick={copyRegisteredOffice}>Скопировать в Фактический адрес?</span>,
                  color: '#4E5AF2',
                  icon: <MdFileCopy color='#4E5AF2' size={14}/>
               }}
               label='Юридический адрес' style={{marginBottom: 0}}>
               <AddressesFields
                  required
                  formName='registeredOffice'
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
            {/*Фактический адрес*/}
            <Form.Item
               className='form__item'
               required
               label='Фактический адрес'
               style={{marginBottom: 0}}
               tooltip={{
                  title: <span className='center_text' onClick={copyActualOffice}>Скопировать в Юридический адрес?</span>,
                  color: '#4E5AF2',
                  icon: <MdFileCopy color='#4E5AF2' size={14}/>
               }}>
               <AddressesFields
                  required
                  formName='actualOffice'
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
            
            <Form.Item
               label='Телефон'
               name='tel'>
               <InputMask
                  mask="+380 99 99 99 999"
                  maskChar=" ">
                  {() => (<Input className='form__input' placeholder="+380"/>)}
               </InputMask>
            </Form.Item>
            
            <Form.Item
               label='E-Mail'
               name='email'
               rules={[{type: 'email', message: "Не валидний адрес!"}]}>
               <Input className='form__input' placeholder="new_email@gmail.com"/>
            </Form.Item>
            
            <Form.Item name='website' label='Сайт'>
               <Input className='form__input' placeholder="https://mysite.com"/>
            </Form.Item>
         </Form>
      </Modal>
   );
}

export default RegionalOfficeModal;