import React, {useEffect, useState} from 'react';
import {bool, func, number, shape} from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Input, message} from "antd";
import InputMask from "react-input-mask";
import AppText from "@/components/ui/AppText.jsx";
import AppAvatar from "@/components/ui/AppAvatar.jsx";
import SocialModal from "@/components/modals/SocialModal.jsx";
import RegionalOfficeModal from "@/components/modals/RegionalOfficeModal.jsx";
import FormAddButton from "@/components/components/FormAddButton/FormAddButton.jsx";
import {value} from "lodash/seq";
import AddressesFields from "@/components/components/AddressesFields/AddressesFields.jsx";
import AppDescriptions from "@/components/ui/AppDescriptions.jsx";
import {useAddressesFields} from "@/hooks/useAddressesFields";
import {MdFileCopy} from 'react-icons/md';
import {setCompanyInfo} from "@assets/helpers/asyncHelpers";
import {getCompanyInfoAction} from "@store/actions/company-actions";
import {socialsLinksImages} from "@assets/helpers/links";


FormSetCompanyContacts.propTypes = {
   changeStep: func,
   step: number,
   settings: shape({
         blockCompanyName: bool,
         blockCompanyKod: bool,
         hideOtherAddresses: bool
      }
   )
};


function FormSetCompanyContacts({changeStep, step, settings}) {
   const dispatch = useDispatch();
   const {company} = useSelector(state => ({
      company: state.company.company
   }))
   const [form] = Form.useForm();
   const {
      offices,
      setOffices,
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
   
   const [socialVisible, setSocialVisible] = useState(false);
   const [socialsLinks, setSocialsLinks] = useState([])
   const [regionalVisible, setRegionalVisible] = useState(false);
   const [regionalOffices, setRegionalOffices] = useState([]);
   
   const addSocialToForm = socials => {
      form.setFields([{name: 'socials', value: socials.filter(el => el.link)}])
      setSocialsLinks(socials.filter(el => el.link))
      setSocialVisible(false)
   }
   const handleOnAddOffice = (officeValue) => {
      setRegionalOffices([...regionalOffices, {...officeValue}]);
      setRegionalVisible(false)
   }
   
   const handleOnRemoveOffice = (index) => {
      setRegionalOffices(prev => {
         const office = prev.slice();
         office.splice(index, 1);
         return office
      });
   }
   
   const onFinish = async () => {
      const key = 'set-company-contact';
      message.loading({content: 'Загрузка', key});
      const formValues = form.getFieldsValue();
      const companyOtherOffices = company?.otherOffices ? [...company?.otherOffices] : [];
      formValues.otherOffices = [...regionalOffices, ...companyOtherOffices];
      const {email, otherOffices, socials, tel, website} = formValues;
      const allOffices = {...offices};
      for (const address in allOffices) {
         delete allOffices[address].city_list;
         delete allOffices[address].street_list;
      }
      try {
         const json = await setCompanyInfo({email, otherOffices, socials, tel, website, ...allOffices});
         if (json.ok) {
            message.success({content: 'Контакты компании обновлены', key});
            await dispatch(getCompanyInfoAction());
            changeStep(step + 1);
         } else {
            message.error({content: 'Ошибка', key})
         }
      } catch (e) {
         message.error({content: e.message, key})
      }
   }
   
   useEffect(() => {
      if (company) {
         const {tel, email, website, socials, actualOffice, registeredOffice} = company;
         setOffices(prev => ({
            ...prev,
            actualOffice: actualOffice ? {...prev.actualOffice, ...actualOffice} : {},
            registeredOffice: registeredOffice ? {...prev.registeredOffice, ...registeredOffice} : {},
         }));
         form.setFields([
            {name: 'tel', value: tel ? tel : null},
            {name: 'email', value: email ? email : null},
            {name: 'website', value: website ? website : null},
            {name: 'socials', value: socials ? socials : null},
            {name: 'registeredOffice_city', value: registeredOffice?.city_name ? registeredOffice.city_name : null},
            {name: 'registeredOffice_street', value: registeredOffice?.street_name ? registeredOffice.street_name : null},
            {name: 'registeredOffice_street_number', value: registeredOffice?.street_number ? registeredOffice.street_number : null},
            {name: 'actualOffice_city', value: actualOffice?.city_name ? actualOffice.city_name : null},
            {name: 'actualOffice_street', value: actualOffice?.street_name ? actualOffice.street_name : null},
            {name: 'actualOffice_street_number', value: actualOffice?.street_number ? actualOffice.street_number : null},
         ]);
         company?.socials && setSocialsLinks(company.socials);
      }
   }, [company]);
   return (
      <>
         <SocialModal visible={socialVisible} changeVisible={setSocialVisible} submitForm={addSocialToForm}/>
         <RegionalOfficeModal
            visible={regionalVisible}
            changeVisible={setRegionalVisible}
            submitForm={handleOnAddOffice}/>
         <Form
            name="set-company-contacts"
            layout='vertical'
            size='large'
            onFinish={onFinish}
            form={form}
            className='form'>
            <AppText text='Контакты' style={{
               color: '#20272E',
               fontSize: 18,
               fontWeight: 700,
               marginBottom: 24,
               lineHeight: 1.5715,
               display: 'block'
            }}/>
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
               style={{marginBottom: 0}}
               className='form__item'
               required
               label='Фактический адрес'
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
            <Form.Item label='Телефон' name='tel'>
               <InputMask
                  mask="+380 99 99 99 999"
                  maskChar=" ">
                  {() => (<Input className='form__input' placeholder="+380"/>)}
               </InputMask>
            </Form.Item>
            <Form.Item label='E-Mail' name='email'
                       rules={[{type: 'email', message: "Не валидний адрес!"}]}>
               <Input className='form__input' placeholder="new_email@gmail.com"/>
            </Form.Item>
            <Form.Item name='website' label='Сайт'>
               <Input className='form__input' placeholder="https://mysite.com"/>
            </Form.Item>
            <Form.Item name='socials' label='Профиль Компании в социальных сетях'>
               <div className="form__row" style={{gap: 12}}>
                  {socialsLinks.map((socialsLink, index) => {
                     const {id, src} = socialsLinksImages.find(social => social.name === socialsLink.name);
                     return <AppAvatar key={index} name={id} src={src}/>
                  })}
                  {socialsLinks.length !== socialsLinksImages.length && (
                     <FormAddButton onClick={() => setSocialVisible(true)} text='Добавить'/>
                  )}
               </div>
            </Form.Item>
            {(settings && !settings.hideOtherAddresses) ? null : (
               <Form.Item noStyle>
                  <FormAddButton extraClasses='_card' onClick={() => setRegionalVisible(true)}
                                 text='Добавить офис в регионах'/>
                  <Form.Item name='otherOffices'>
                     <Form.Item noStyle>
                        {!!regionalOffices.length && (
                           <div className="form__row" style={{flexWrap: 'wrap', gap: 8, paddingTop: 12}}>
                              {regionalOffices.map((item, index) => {
                                 const {nameOffice, actualOffice} = item;
                                 const {city_name, street_name, street_number} = actualOffice;
                                 return (
                                    <AppDescriptions
                                       key={index} title={nameOffice} descriptions={{city_name, street_name, street_number}}
                                       onRemove={() => handleOnRemoveOffice(index)}/>)
                              })}
                           </div>
                        )}
                     </Form.Item>
                  </Form.Item>
               </Form.Item>
            )}
            <Form.Item>
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
      </>
   
   );
}

export default FormSetCompanyContacts;