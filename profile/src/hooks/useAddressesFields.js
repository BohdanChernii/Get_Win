import {getCiti, getStreets} from "@assets/helpers/asyncHelpers";
import {message} from "antd";
import {useState} from "react";

export const useAddressesFields = (form, fields) => {
   const [offices, setOffices] = useState(fields.reduce((acc, name) => {
      return {
         ...acc,
         [name]: {
            city_id: '',
            city_name: '',
            city_list: [],
            street_id: '',
            street_name: '',
            street_list: [],
            street_number: ''
         }
      }
   }, {}));
   
   const onClearCity = (formName) => {
      setOffices(prev => ({
         ...prev, [formName]: {
            ...prev[formName],
            city_id: '',
            city_name: '',
            city_list: [],
            street_id: '',
            street_name: '',
            street_list: [],
         }
      }));
      form.resetFields([`${formName}_street`, `${formName}_street_number`]);
   };
   const onSelectCity = (formName, option) => {
      const {id, name} = offices[formName].city_list?.find(el => el.name === option);
      if (id && name) {
         setOffices(prev => ({...prev, [formName]: {...prev[formName], city_id: id, city_name: name}}));
      }
   };
   const onSearchCity = async (formName, name) => {
      if (name.length >= 3) {
         try {
            const city_list = await getCiti(name);
            setOffices(prev => ({...prev, [formName]: {...prev[formName], city_list, city_name: name}}));
         } catch (e) {
            message.error(e.message)
         }
      } else onClearCity(formName);
   }
   
   // street
   const onClearStreet = (formName) => {
      setOffices(prev => ({...prev, [formName]: {...prev[formName], street_id: '', street_name: '', street_list: [],}}));
      form.resetFields([`${formName}_street_number`]);
   };
   const onSelectStreet = (formName, option) => {
      const {id, name} = offices[formName].street_list?.find(el => el.name === option);
      if (id && name) {
         setOffices(prev => ({...prev, [formName]: {...prev[formName], street_id: id, street_name: name}}));
      }
   };
   const onSearchStreet = async (formName, name) => {
      if (name.length >= 3) {
         try {
            const street_list = await getStreets(offices[formName].city_id, name);
            setOffices(prev => ({...prev, [formName]: {...prev[formName], street_list, street_name: name}}));
         } catch (e) {
            message.error(e.message)
         }
      } else onClearStreet(formName);
   }
   
   // street_number
   const onChangeStreetNumber = (formName, name) => {
      setOffices(prev => ({...prev, [formName]: {...prev[formName], street_number: name}}));
   };
   
   // copy addresses
   const copyRegisteredOffice = () => {
      const {registeredOffice} = offices;
      setOffices(prev => ({...prev, actualOffice: {...registeredOffice}}));
      form.setFields([
         {name: 'actualOffice_city', value: registeredOffice.city_name ? registeredOffice.city_name : null, errors: []},
         {name: 'actualOffice_street', value: registeredOffice.street_name ? registeredOffice.street_name : null, errors: []},
         {name: 'actualOffice_street_number', value: registeredOffice.street_number ? registeredOffice.street_number : null, errors: []}
      ])
   };
   const copyActualOffice = () => {
      const {actualOffice} = offices;
      setOffices(prev => ({...prev, registeredOffice: {...actualOffice}}))
      form.setFields([
         {name: 'registeredOffice_city', value: actualOffice.city_name ? actualOffice.city_name : null, errors: []},
         {name: 'registeredOffice_street', value: actualOffice.street_name ? actualOffice.street_name : null, errors: []},
         {name: 'registeredOffice_street_number', value: actualOffice.street_number ? actualOffice.street_number : null, errors: []}
      ])
   };
   
   return {
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
      copyActualOffice,
   }
}