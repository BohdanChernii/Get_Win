import React, {useEffect, useState} from 'react';
import {bool, func, number, shape} from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Input, message} from "antd";
import AppText from "@/components/ui/AppText.jsx";
import {setCompanyInfo} from "@assets/helpers/asyncHelpers";
import AppSelect from "@/components/ui/AppSelect.jsx";
import {value} from "lodash/seq";
import ChangeVerifyModal from "@/components/modals/ChangeVerifyModal/ChangeVerifyModal.jsx";
import {companyStatusText} from "@assets/helpers/constants";
import {getCompanyInfoAction} from "@store/actions/company-actions";
import {rules} from "@assets/helpers/messages";

FormSetCompanyOther.propTypes = {
   changeStep: func,
   step: number,
   settings: shape({
         blockCompanyName: bool,
         blockCompanyKod: bool,
         hideOtherAddresses: bool
      }
   )
};

function FormSetCompanyOther({changeStep, step, settings}) {
   const dispatch = useDispatch();
   const {lists} = useSelector(state => state.dropDownList);
   const {company, error} = useSelector(state => state.company);
   const [form] = Form.useForm();
   
   const [isValidateCompanyName, setIsValidateCompanyName] = useState(true);
   const [isValidateCompanyKod, setIsValidateCompanyKod] = useState(true);
   
   const [visible, setVisible] = useState(false);
   
   const validationText = {
      name: 'Значение не соответствует записанному названию компании',
      kod: 'Значение не соответствует указанному коду ЕГРПОУ компании'
   }
   
   const handleOnValidate = (value, name) => {
      if (company?.companyName && name === 'companyName') {
         if (company?.companyName !== value.toString()) {
            setIsValidateCompanyName(false)
         } else {
            setIsValidateCompanyName(true)
         }
      }
      
      if (company?.kod && name === 'kod') {
         if (company?.kod.toString() !== value.toString()) {
            setIsValidateCompanyKod(false)
         } else {
            setIsValidateCompanyKod(true)
         }
      }
   }
   
   const onFinish = async () => {
      if (!isValidateCompanyName || !isValidateCompanyKod) {
         setVisible(!visible)
      } else {
         const key = 'update-company'
         message.loading({content: 'Загрузка', key})
         try {
            const json = await setCompanyInfo(form.getFieldsValue());
            await dispatch(getCompanyInfoAction())
            if (json.ok) {
               message.success({content: 'Данные об компании обновлени', key});
               await dispatch(getCompanyInfoAction())
               changeStep(step + 1)
            } else {
               message.error({content: json.message, key})
            }
         } catch (e) {
            message.error({content: e.message, key})
         }
      }
   }
   
   useEffect(() => {
      if (company && !error) {
         company?.companyName && form.setFields([{name: 'companyName', value: company.companyName}])
         company?.companyBrand && form.setFields([{name: 'companyBrand', value: company.companyBrand}])
         company?.kod && form.setFields([{name: 'kod', value: Number(company.kod)}])
         company?.s_activity?.name && form.setFields([{name: 's_activity', value: company.s_activity.name}])
         company?.services && form.setFields([{name: 'services', value: company.services}])
      }
   }, [company]);
   
   return (
      <>
         <ChangeVerifyModal visible={visible} changeVisible={setVisible} text={companyStatusText.RESET}/>
         <Form
            name="set-company-other"
            layout='vertical'
            size='large'
            onFinish={onFinish}
            form={form}
            className='form'
         >
            <AppText text='Общее'
                     style={{
                        color: '#20272E',
                        fontSize: 18,
                        fontWeight: 700,
                        marginBottom: 24,
                        lineHeight: 1.5715,
                        display: 'block'
                     }}/>
            
            <Form.Item
               validateStatus={!isValidateCompanyName ? 'warning' : 'success'}
               help={!isValidateCompanyName ? validationText.name : null}
               name='companyName' label='Название Компании'
               rules={[{required: true, message: rules.required}]}>
               <Input disabled={settings && settings.blockCompanyName} onChange={(e) => handleOnValidate(e.target.value, 'companyName')}
                      className='form__input'
                      placeholder="ООО Компания"/>
            </Form.Item>
            
            <Form.Item name='companyBrand' label='Название Торговой Марки'>
               <Input className='form__input' placeholder="Название Торговой Марки"/>
            </Form.Item>
            
            <Form.Item name='kod'
                       label='Код ЕГРПОУ (ЄДРПОУ)/ИНН ФОП'
                       validateStatus={!isValidateCompanyKod ? 'warning' : 'success'}
                       help={!isValidateCompanyKod ? validationText.kod : null}
                       rules={[{required: true, message: rules.required}]}>
               <Input disabled={settings && settings.blockCompanyKod} onChange={(e) => handleOnValidate(e.target.value, 'kod')} type='number'
                      className='form__input'
                      placeholder="1234567"/>
            </Form.Item>
            
            <Form.Item name='s_activity' label='Сфера деятельности' rules={[{required: true, message: rules.required}]}>
               <AppSelect options={lists?.s_activity} placeholder="Сфера деятельности"/>
            </Form.Item>
            
            <Form.Item name='services' label='Услуги / Продукт' rules={[{required: true, message: rules.required}]}>
               <Input className='form__input' placeholder="Услуги"/>
            </Form.Item>
            
            <Form.Item>
               <div className='form__row _right'>
                  <Button type="primary" shape="round" htmlType="submit">
                     Сохранить и продолжить
                  </Button>
               </div>
            </Form.Item>
         </Form>
      </>
   
   );
}

export default FormSetCompanyOther;